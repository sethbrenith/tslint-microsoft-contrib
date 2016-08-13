import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

import {AstUtils} from './utils/AstUtils';
import {ErrorTolerantWalker} from './utils/ErrorTolerantWalker';
import {ExtendedMetadata} from './utils/ExtendedMetadata';

/**
 * Implementation of the no-constant-condition rule.
 */
export class Rule extends Lint.Rules.AbstractRule {

    public static metadata: ExtendedMetadata = {
        ruleName: 'no-constant-condition',
        type: 'maintainability',
        description: 'Do not use constant expressions in conditions.',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Error',
        severity: 'Critical',
        level: 'Opportunity for Excellence',
        group: 'Correctness',
        commonWeaknessEnumeration: '398, 570, 571, 670'
    };

    public static FAILURE_STRING = 'Found constant conditional: ';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoConstantConditionRuleWalker(sourceFile, this.getOptions()));
    }
}

class NoConstantConditionRuleWalker extends ErrorTolerantWalker {

    protected visitIfStatement(node: ts.IfStatement): void {
        if (AstUtils.isConstantExpression(node.expression)) {
            const message: string = Rule.FAILURE_STRING + 'if (' + node.expression.getText() + ')';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        super.visitIfStatement(node);
    }


    protected visitConditionalExpression(node: ts.ConditionalExpression): void {
        if (AstUtils.isConstantExpression(node.condition)) {
            const message: string = Rule.FAILURE_STRING + node.condition.getText() + ' ?';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        super.visitConditionalExpression(node);
    }


    protected visitWhileStatement(node: ts.WhileStatement): void {
        if (AstUtils.isConstantExpression(node.expression)) {
            const message: string = Rule.FAILURE_STRING + 'while (' + node.expression.getText() + ')';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        super.visitWhileStatement(node);
    }


    protected visitDoStatement(node: ts.DoStatement): void {
        if (AstUtils.isConstantExpression(node.expression)) {
            const message: string = Rule.FAILURE_STRING + 'while (' + node.expression.getText() + ')';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
        }
        super.visitDoStatement(node);
    }


    protected visitForStatement(node: ts.ForStatement): void {
        if (node.condition != null) {
            if (AstUtils.isConstantExpression(node.condition)) {
                const message: string = Rule.FAILURE_STRING + ';' + node.condition.getText() + ';';
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
            }
        }
        super.visitForStatement(node);
    }
}
