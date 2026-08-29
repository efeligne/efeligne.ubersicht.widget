declare module 'uebersicht' {
  export const React: typeof import('react');

  export function run(cmd: string): Promise<string>;
  export function css(strings: TemplateStringsArray, ...exprs: unknown[]): string;
}
