## Запуск клиента:

Доступен по http://localhost:3000

-   Docker (если пакеты долго скачиваются, попробуйте через VPN)

    ```
    docker-compose up
    ```

-   Npm dev
    ```
    npm install
    npm run dev
    ```

##

P.S Основной фокус на клиенте, сервер простой, без особых валидации и тд. Простоя `JWT`
авторизация без `refresh_token`, токен валиден **5 минут**.
