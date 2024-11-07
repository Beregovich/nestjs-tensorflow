#### version 0.1 / 11.10.2023

### WARNING

- Не делаем изменения в данном модуле!
- Если нужно добавить на (staging/production) новые политики => пишите makena

### Подключение модуля

- Для функционирования данного модуля необходимо установить библиотеки:
  @nestjs/axios
  axios

Для подключения модуля нам необходимо зарегистрировать его в app module.
CasbinModule регистрируется глобально!

    @Module({
    imports: [
       CasbinModule.register({
          friendToken: process.env.FRIEND_TOKEN,
          casbinRoleServiceUrl: process.env.CASBIN_ROLE_SERVICE_URL,
       }),
       ],
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule {}

### Покрытие ролевыми политиками

Для покрытия контроллера ролевыми политиками необходимо:

- Установить декоратор CasbinObject на контроллер и передать
  наименование ресурса (tm_commands/ streams / crm_admin)

      @CasbinObject('stream')
      @Controller('api/streams')
      export class StreamsController {

- Установить декоратор CasbinAction на контроллер и передать
  тип экшена для данного ресурса (read / create / start / update / update.all)

- Установить CasbinActionGuard после авторизационного
  !!! На момент сработки CasbinActionGuard в request должен быть объект user имеющий свойство id: number
  если его не будет, то 403

        @CasbinAction('start')
        @UseGuards(AuthGuard, CasbinActionGuard)
        @Get()
        async getHello(): string {

- Для использования ролевых политик внутри BLL:

  async update(currentUserId: number) {
  const accessPolicy = await this.casbinService.enforce([
  new CasbinPolicyModel(
  currentUserId,
  new ObjectModel('users'),
  'update.password',
  ),
  ]);

       if (accessPolicy !== null && accessPolicy.results[0].access) {
         //do action
       }

  }

### Генерация типов экшенов

- Чтобы не ошибиться в названиях типов CasbinAction необходимо
  перегенерировать объект Actions (casbin/actions/actions.ts)

Запускаем проект и в swagger выполняем запрос на endpoint casbin/generate
