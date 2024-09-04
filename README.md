app-pryaniky.vercel.app


SPA App

login - user
password - password

Этот проект представляет собой одностраничное приложение (SPA), созданное с использованием React и Material-UI. Приложение предоставляет возможность аутентификации пользователей и выполнения CRUD (создание, чтение, обновление, удаление) операций с таблицей данных, полученной с сервера.

Возможности

Аутентификация пользователей: Пользователи могут войти в систему, используя логин и пароль. Токен аутентификации сохраняется в localStorage, чтобы поддерживать сеанс при перезагрузке страницы.
Таблица данных: На главной странице отображается таблица с данными, загружаемыми с сервера. Пользователи могут выполнять операции создания, чтения, обновления и удаления записей в таблице.
Анимации и улучшенный визуал: Добавлены плавные анимации с использованием framer-motion, иконки для улучшения визуального восприятия, а также поиск по таблице.
Респонсивный дизайн: Интерфейс построен с использованием компонентов Material-UI для обеспечения адаптивного и современного внешнего вида.
Обработка ошибок: Приложение включает обработку ошибок для операций аутентификации и работы с данными. Пользователи информируются о любых ошибках через уведомления Snackbar.
Индикаторы загрузки: В процессе получения данных и других асинхронных операций отображаются индикаторы загрузки, такие как прогресс-бары и спиннеры.
Поиск по таблице: Реализован функционал поиска, который позволяет пользователям фильтровать записи в таблице по имени документа.

Подтверждение действий: Добавить диалоговые окна для подтверждения удаления записей.
Темизация: Реализовать переключение между светлой и темной темами.
Дополнительные фильтры: Внедрить возможность сортировки и фильтрации записей по разным столбцам таблицы.
Пользовательские роли: Добавить поддержку различных ролей пользователей, например, администраторов и обычных пользователей.
