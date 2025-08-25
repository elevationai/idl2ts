import { CORBA } from 'corba.ts';

export namespace Example {
  export interface Calculator extends CORBA.Object {
    add(a: number, b: number): Promise<number>;
    subtract(a: number, b: number): Promise<number>;
    multiply(a: number, b: number): Promise<number>;
    divide(a: number, b: number): Promise<number>;
    readonly lastResult: number;
    get_lastResult(): Promise<number>;
    description: string;
    get_description(): Promise<string>;
    set_description(value: string): Promise<void>;
  }

  export class CalculatorStub implements Calculator {
    constructor(private objRef: CORBA.ObjectRef) {}

    async add(a: number, b: number): Promise<number> {
      const request = this.objRef.create_request('add');
      request.add_in_arg('a', a);
      request.add_in_arg('b', b);
      await request.invoke();
      return request.return_value();
    }

    async subtract(a: number, b: number): Promise<number> {
      const request = this.objRef.create_request('subtract');
      request.add_in_arg('a', a);
      request.add_in_arg('b', b);
      await request.invoke();
      return request.return_value();
    }

    async multiply(a: number, b: number): Promise<number> {
      const request = this.objRef.create_request('multiply');
      request.add_in_arg('a', a);
      request.add_in_arg('b', b);
      await request.invoke();
      return request.return_value();
    }

    async divide(a: number, b: number): Promise<number> {
      const request = this.objRef.create_request('divide');
      request.add_in_arg('a', a);
      request.add_in_arg('b', b);
      await request.invoke();
      return request.return_value();
    }

    get_lastResult(): Promise<number> {
      const request = this.objRef.create_request('_get_lastResult');
      await request.invoke();
      return request.return_value();
    }

    get lastResult(): number {
      throw new Error('Direct property access not supported. Use get_lastResult() instead.');
    }

    get_description(): Promise<string> {
      const request = this.objRef.create_request('_get_description');
      await request.invoke();
      return request.return_value();
    }

    set_description(value: string): Promise<void> {
      const request = this.objRef.create_request('_set_description');
      request.add_in_arg('value', value);
      await request.invoke();
    }

    get description(): string {
      throw new Error('Direct property access not supported. Use get_description() instead.');
    }

    set description(value: string) {
      throw new Error('Direct property access not supported. Use set_description() instead.');
    }

  }

  export interface Result {
    value: number;
    message: string;
  }

  export class DivisionByZero extends CORBA.SystemException {
    message: string;

    constructor(message: string) {
      super('DivisionByZero');
      this.message = message;
    }
  }

  export enum OperationType {
    ADD = 0,
    SUBTRACT = 1,
    MULTIPLY = 2,
    DIVIDE = 3
  }

  export type NumberList = number[];

  export const MAX_VALUE: number = 1000000;

}
