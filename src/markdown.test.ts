import * as tape from "tape";
import { markdown, addPlugin, IPlugin } from ".";

tape("markdown plugin", (assert: tape.Test) => {
  const dumbPlugin: IPlugin = (code: string) => `<div>${code}</div>`;

  addPlugin("dumb", dumbPlugin);

  const result = markdown(`
\`\`\`dumb
test
\`\`\`
`);

  assert.equal(result, "<div>test</div>");
  assert.end();
});
