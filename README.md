# Information
- To create `tsconfig.json` file:
  `npx tsc --init`.
- To compile typescript files:
  `npx tsc`.
- To generate jest config file:
  `npx jest --init`.
- On second curse, inside the `Domain` folder, we'll use `features` instead of `usecases` as folder name.
- On second curse, inside the `Application` folder, we'll use `services` instead of `usecases` as folder name.
- The project should use the [Triple A (arrange, act and assert) pattern](https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80) in tests, but what it means? Basically, we need to separate the tests in three scopes.
- To apply the __Template Method Pattern__ is necessary to create an Abstract class which cannot be instantiated, it's useful only for __inheritance__, move common behavior to there, so you just need extend that class.

> You can verify if Node has support on [NodeGreen](https://node.green).

