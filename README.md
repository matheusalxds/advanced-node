# Information
- To create `tsconfig.json` file:
  `npx tsc --init`.
- To compile typescript files:
  `npx tsc`.
- To generate jest config file:
  `npx jest --init`.
- On second curse, inside the `Domain` folder, we'll use `features` instead of `usecases` as folder name.
- The project should use the [Triple A (arrange, act and assert) pattern](https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80) in tests, but what it means? Basically, we need to separate the tests in three scopes.
- To apply the __Template Method Pattern__ is necessary to create an Abstract class which cannot be instantiated, it's useful only for __inheritance__, move common behavior to there, so you just need to extend that class.
- To make tests with Facebook API, you need to setup your account on `https://developers.facebook.com/`, you need to:
  - Add new Application;
    - While you're on `Add a product` (or something like that).
      - Select `Login with Facebook`;
  - On Config page you need to get `App ID` and `Secret key`.
  - On `Roles`, you need to add/edit an account, it's necessary to update user test grants and:
    - remove `user_friend`;
    - add `email`;
    - add `public_profile`;
  - Is Sometimes necessary to validate if the roles was applied, if no, you need to `Request`.
     ````
     Facebook API
     Name: Matheus test
     Pass: abc@12345
     ````



## FYI
### TypeORM

>Using TypeORM is recommended to generate migrations manually.

### Site to generate image with 1px
`https://shoonia.github.io/1x1/#5542c9ff`


## Code Smells (Anti-Patterns)

* Blank Lines
* Comments
* Data Clumps
* Divergent Change (solve by Single responsability)
* Duplicated Code (solve by DRY)
* Inappropriate Intimacy
* Feature Envy
* Large Class
* Long Method
* Long Parameter List
* Middle Man
* Primitive Obsession
* Refused Bequest
* Shotgun Surgery
* Speculative Generality (YAGNI)

> You can verify if Node has support on [NodeGreen](https://node.green).

