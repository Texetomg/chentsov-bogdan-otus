LeetCode — это онлайн-платформа для подготовки к собеседованию по программированию. Служба предоставляет задачи по кодированию и алгоритмам, предназначенные для пользователей, желающих попрактиковаться в программировании.

Требование к выполнению:
хранить задачи, у которых есть описание, примеры входных и выходных данных, уровень сложности, теги (например, "алгоритмы", "структуры данных", "динамическое программирование"), дополнительные материалы (файлы, ссылки)
предоставлять возможность логина и логаута
содержать роли пользователей (пользователь, администратор, интервьюер) и проверять, имеет ли пользователь определенные разрешения в системе; пользователи должны иметь оставлять комментарии к задачам и обсуждать возможные решения; пользователи могут оценивать задачи, что помогает другим участникам понять сложность и интересность задачи; нтервьюер должен иметь возможность видеть профиль пользователей, редактировать их рейтинг; интервьюеры могут добавлять, редактировать и удалять задачи, теги или категории.
содержать REST API для управления ресурсами приложения
использовать базу данных для хранения информации о задачах, пользователях
Приложение МОЖЕТ:
быть построено на ExpressJS, Fastify или NestJS
использовать PostgreSQL
иметь дополнительные функции, такие как поиск по сайту по запросу, загрузка файлов и т. д.

app - npx nodemon app.js
test - npm test

описание сущностей:
/*  
Пользователь:
    /user - post добавление
    /user/:id - put обновление
    /user/:id - delete удаление
*/

type TUser = {
    id: number,
    login: string,
    password: string,
    role: ERoles, // роль пользователя, не сущность, так как значения фиксированные
    rank?: number, // ранг формируется из рейтинга в комментариях TComment
    name?: string,
    solutionIds?: number[], // ссылки на сущность TSolution
    skillIds?: number[], // ссылки на сущность TSkill
    discussionIds?: number[], // ссылки на сущность TDiscussion
    commentIds?: number[], // ссылки на сущность TComment
}

enum ERoles {
    USER = 'user',
    ADMIN = 'admin',
    INTERVIEWER = 'interviewer'
}

/*
Задача:
    /task - post добавление
    /task/:id - put обновление
    /task/:id - delete удаление
*/

type TTask = {
    id: number,
    name: string,
    description: string,
    tagIds: number[], // ссылки на сущность TTag
    rating: number, // рассчитывается из группировке по сущности TRating
    constraints: string[], // дополнительная информация по задаче
    examples: TExample[], // дополнительная информация по задаче
    discussionId: number, // ссылки на сущность TDiscussion
}

type TExample = {
    meta: any,
    input: string,
    output: string,
}

/*
Навык:
    /skill - post добавление
    /skill/:id - put обновление
    /skill/:id - delete удаление
*/

type TSkill = {
    id: number,
    name: string,
    grade: EGrade,
}

enum EGrade {
    ADVANCED = 'advanced',
    INTERMEDIATE = 'intermediate',
    FUNDAMENTAL = 'fundamental'
}

/*
Решения:
    /solution - post добавление
    /solution/:id - put обновление
    /solution/:id - delete удаление
*/

type TSolution = {
    id: number,
    name: string,
    userId: number, // ссылка на сущность TUser
    taskId: number, // ссылка на сущность TTask
    description: string,
}

/*
Тег:
    /tag - post добавление
    /tag/:id - delete удаление
*/

type TTag = {
    id: number,
    name: string | EDifficult,
}

enum EDifficult {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

/*
Рейтинг:
    /rating - post добавление
*/

type TRating = {
    id: number,
    value: number, // значение рейтинга
    userId: number, // ссылка на сущность TUser
    taskId: number, // ссылка на сущность TTask
}

/*
Комментарий:
    /comment - post добавление
    /comment/:id - put обновление
*/

type TComment = {
    id: number,
    userId: number, // ссылка на сущность TUser
    value: string, // текст комментария
    parentId?: number, // ссылка на сущность TComment
    childrenIds?: number[], // ссылки на сущность TComment
    rating?: number, // значение рейтинга, проставляемое другими юзерами в дискуссии
}

/*
Дискуссии:
    /discussion - post добавление
    /discussion/:id - put обновление
*/

type TDiscussion = {
    taskId: number, // Ссылка на сущность TTask
    commentIds: number[], // Ссылка на сущность TComment
}
