const MESSAGES = {
    NOT_FOUND: "Record not Found",
    SUBSCRIPTION_NOT_FOUND: "Subscription not found",
    PENDING_VERIFICATION: "Pending verification",
    COMMUNITY_NOT_FOUND: "Community not Found",
    ROLE_NOT_FOUND: "Role not Found",
    PENDING_COMMUNITY: "Pending community",
    PENDING_ANNUAL_REVENUE: "Pending annual revenue",
    PENDING_USAGE: "Pending usage",
    PENDING_PROFILE: "Pending profile",
    SUCCESS: "Success",
    MEDIA_NOT_FOUND: "No media file provided",
    MEDIA_UPLOAD_FAILED: "Media upload failed",
    UPDATED_PASSWORD_EXPIRED: "Updated password expired",
    COMPLETED_PROFILE: "Completed profile",
    SUCCESSFUL_CREATED: "Created successfully.",
    ERROR_IN_CREATING: "Error In Creating!",
    ERROR_IN_DELETING: "Error In Deleting!",
    SUCCESSFUL_UPDATE: "Successfully Updated!",
    SUCCESSFUL_DELETED: "Successfully Deleted!",
    ERROR_IN_IMAGE_UPLOADING: "Error in Image Uploading!",
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_EMAIL: "Invalid email",
    SUCCESSFUL_SIGNUP: "Successfully sign up!",
    ALREADY_EXISTS: "email already taken!",
    SUCCESSFUL_LOGIN: "Login successfully",
    INVALID_OTP: "OTP is invalid!",
    ACTIVE_COMMUNITY_NOT_FOUND: "Active community not found",
    COMMUNITY_SPACE_ALREADY_EXIST: "Community space already exist",
    SPACES_GROUPS_NOT_FOUND: "Spaces groups not found",
    SPACES_NOT_FOUND: "Spaces not found",
    DUPLICATE_COURSE: "Space already have a course.",
    COURSE_SECTION_NOT_FOUND: "Course section not found",
    TOPIC_ALREADY_EXIST: "Topic already exist",
    TOPIC_NOT_FOUND: "Topic not found",
    POST_NOT_FOUND: "Post not found",
    COMMENTS_CLOSED: "Comments closed on this post",
    POLL_QUESTION_NOT_FOUND: "Poll question not found",
    POLL_OPTION_NOT_FOUND: "Poll option not found",
    POLL_QUESTION_EXPIRED: "Poll question expired",
    COMMUNITY_MEMBER_ALREADY_EXIST: "Community member already exist",
    SPACE_MEMBER_ALREADY_EXIST: "Space member already exist",
    SPACE_NOT_FOUND: "Space not found",
    COURSE_SPACE_NOT_FOUND: "Space is not of type course",
    INCORRECT_LESSON_TYPE: "Type is not a valid lesson type",
    ERROR_IN_DELETE: "Record could not be deleted",
    ERROR_IN_UPDATE: "Record could not be updated",
    POST_SPACE_NOT_FOUND: "Post space not found",
    COURSES_NOT_FOUND: "Courses not found",
    COMMUNITY_MEMBER_NOT_FOUND: "Community member not found",
    COURSE_NOT_FOUND: "Course not found",
    SPACE_MEMBER_NOT_FOUND: "Space member not found",
    DUPLICATE_USER_SUBSCRIPTION: "User's community already subcribed to a plan",
    SUBSCRIPTION_NOT_VALID: "Subscription is not valid or expired.",
    COMMUNITY_MEMBER_NOT_ALLOWED: "Community member is not allowed to perform this action",
    USER_COURSE_NOT_FOUND: "User course not found",
    NOT_ALLOWED: "Not allowed",
    LIMIT_RSVP: "Limit RSVP reached",
    MENTION_NOTIFICATION_SENT: "Mention notifications sent successfully",
    USERNAME_ALREADY_EXISTS: "Username already exists",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    MEMBER_NOT_ALLOWED_TO_POST: "Member not allowed to post",
    POST_TITLE_NOT_ALLOWED: "Post title not allowed",
    NOT_ALLOWED_TO_CREATE_SPACES_GROUPS: "Not allowed to create spaces groups",
    NOT_ALLOWED_TO_CREATE_SPACE: "Not allowed to create space",
    MEMBER_NOT_ALLOWED_TO_CREATE_EVENT: "Member not allowed to create event",
    ONLY_ADMIN_CAN_SUBSCRIBE: "Only admin can subscribe to a plan"
};

const TABLES = {
    users: "users",
    roles: "roles",
    user_roles: "user_roles",
    permissions: "permissions",
    role_permissions: "role_permissions",
    tokens: "tokens",
    otp: "otp",
    community: "community",
    timezones: "timezones",
    settings: "settings",
    user_active_community: "user_active_community",
    spaces_options: "spaces_options",
    spaces_groups: "spaces_groups",
    spaces: "spaces",
    spaces_posts: "spaces_posts",
    topics: "topics",
    spaces_media: "spaces_media",
    spaces_topics: "spaces_topics",
    likes: "likes",
    comment: "comment",
    spaces_events: "spaces_events",
    spaces_event_hosts: "spaces_event_hosts",
    community_members: "community_members",
    poll_questions: "poll_questions",
    poll_options: "poll_options",
    user_poll_votes: "user_poll_votes",
    courses_section: "courses_section",
    courses_section_lessons: "courses_section_lessons",
    chat_messages: "chat_messages",
    spaces_courses: "spaces_courses",
    spaces_courses_sections: "spaces_courses_sections",
    spaces_courses_lessons: "spaces_courses_lessons",
    course_quiz: "course_quiz",
    course_quiz_answers: "course_quiz_answers",
    spaces_image_post: "spaces_image_posts",
    event_attendees: "event_attendees",
    space_members: "space_members",
    subscription: "subscription",
    workflow_triggers: "workflow_triggers",
    workflow_actions: "workflow_actions",
    workflows: "workflows",
    workflow_action_mapping: "workflow_action_mapping",
    users_subscription: "users_subscription",
    user_course: "user_course",
    user_course_lesson: "user_course_lesson",
    subscription_features: "subscription_features",
    notification: "notification",
    assign_topics: "assign_topics",
    course_quiz_results: "course_quiz_results",
    course_quiz_answer_results: "course_quiz_answer_results",
    streams: "streams",
    user_streams: "user_streams"
};

const MODELS = {
    user: "User",
    role: "Role",
    user_role: "UserRole",
    permission: "Permission",
    role_permission: "RolePermission",
    token: "Token",
    otp: "Otp",
    community: "Community",
    timezones: "Timezones",
    settings: "Settings",
    user_active_community: "UserActiveCommunity",
    spaces_options: "SpacesOptions",
    spaces_groups: "SpacesGroups",
    spaces: "Spaces",
    spaces_posts: "SpacesPosts",
    topics: "Topics",
    spaces_media: "SpacesMedia",
    spaces_topics: "SpacesTopics",
    likes: "Likes",
    comment: "Comment",
    chat_message: "ChatMessage",
    spaces_event: "SpacesEvent",
    spaces_event_host: "SpacesEventHost",
    poll_questions: "PollQuestions",
    poll_options: "PollOptions",
    user_poll_votes: "UserPollVotes",
    spaces_courses: "SpacesCourses",
    spaces_courses_sections: "SpacesCoursesSections",
    spaces_courses_lessons: "SpacesCoursesLessons",
    course_quiz: "CourseQuiz",
    course_quiz_answers: "CourseQuizAnswers",
    spaces_image_post: "SpacesImagePost",
    event_attendees: "EventAttendees",
    space_members: "SpaceMembers",
    community_members: "CommunityMembers",
    subscription: "Subscription",
    workflow_triggers: "WorkflowTriggers",
    workflow_actions: "WorkflowActions",
    workflows: "Workflows",
    workflow_action_mapping: "WorkflowActionMapping",
    users_subscription: "UsersSubscription",
    user_course: "UserCourse",
    user_course_lesson: "UserCourseLesson",
    subscription_features: "SubscriptionFeatures",
    notification: "Notification",
    assign_topics: "AssignTopics",
    course_quiz_results: "CourseQuizResults",
    course_quiz_answer_results: "CourseQuizAnswerResults",
    stream: "Stream",
    user_stream: "UserStream"
};

const STRING_CHECKS = {
    PENDING_COMMUNITY: "PENDING_COMMUNITY"
};

const RESPONSE_STATUS = {
    ALREADY_EXISTS: 409,
    PENDING: 403,
    SUCCESS: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    NOT_ALLOWED: 405,
    EXPIRED: 410,
    SERVER_ERROR: 500,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    PAYMENT_REQUIRED: 402,
    CONFLICT: 409
};

const status = {
    communityStatusPending: {
        PENDING_INFO: "PENDING_INFO",
        PENDING_ESSENTIALS: "PENDING_ESSENTIALS",
        COMPLETED: "COMPLETED"
    },
    userStatusPending: {
        PENDING_VERIFICATION: "PENDING_VERIFICATION",
        PENDING_COMMUNITY: "PENDING_COMMUNITY",
        BLOCKED: "BLOCKED",
        COMPLETED_PROFILE: "COMPLETED_PROFILE"
    },
    otpStatusPending: {
        VERIFIED: "VERIFIED",
        PENDING: "PENDING",
        EXPIRED: "EXPIRED"
    }
};

const values = {
    otpPurpose: {
        PASSWORD_RESET: "PASSWORD_RESET",
        VERIFICATION: "VERIFICATION"
    }
};

const emails = {
    forgotPasswordEmailTemplate: "forgotPasswordEmailTemplate",
    verificationEmailTemplate: "verificationEmailTemplate",
    communityMemberRequestEmailTemplate: "communityMemberRequestEmailTemplate",
    spaceMemberRequestEmailTemplate: "spaceMemberRequestEmailTemplate",
    postPublishedEmailTemplate: "newPostPublishedEmailTemplate",
    eventPublishedTemplate: "newEventPublishedEmailTemplate",
    imagePublishedTemplate: "newImagePublishedTemplate",
    communityMemberJoined: "newCommunityMemberJoined",
    welcomeNewUser: "welcomeNewUser",
    passwordChangedNotification: "passwordChangedNotification",
    emailChangedNotification: "emailChangedNotification",
    newLoginNotification: "newLoginNotification"
};

const MENTION_PATTERN = /@([\w.-]+)/g;

const entityModels = {
    get EVENTS() {
        return require("../models").SpaceEvent;
    },
    get POST() {
        return require("../models").SpacesPosts;
    },
    get CHATS() {
        return require("../models").ChatMessage;
    },
    get MEMBERS() {
        return require("../models").SpaceMembers;
    },
    get COURSE() {
        return require("../models").SpacesCourses;
    },
    get IMAGES() {
        return require("../models").SpacesImagePost;
    },
    get COMMENT() {
        return require("../models").Comment;
    }
};

module.exports = {
    TABLES,
    MODELS,
    MESSAGES,
    STRING_CHECKS,
    RESPONSE_STATUS,
    status,
    values,
    emails,
    entityModels,
    MENTION_PATTERN
};
