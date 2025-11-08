## Description

Todo application using [Nest](https://github.com/nestjs/nest) framework.

## Project setup

Create `secrets.json` inside `src/global/secrets`

Sample content of `secrets.json`

```bash
{
  "JWT_SECRET": "your_secret",
  "DB_HOST": "localhost",
  "DB_PORT": 3306,
  "DB_USERNAME": "username",
  "DB_PASSWORD": "password",
  "DB_DATABASE": "todo"
}
```

Install dependencies

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
