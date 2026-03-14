// Message Schema Documentation
/*
Message Model
--------------
Stores messages for classroom and direct chats

Fields:
- sender: ObjectId (ref: User) - Message sender
- receiver: ObjectId (ref: User) - DirectMessage recipient (optional)
- classroom: ObjectId (ref: Classroom) - Classroom context (optional)
- content: String (required) - Message content
- attachments: [String] - File attachment URLs
- isRead: Boolean - Read status
- createdAt: Date - Timestamp

Types:
1. Classroom Message - Used in group chats (has classroom ID)
2. Direct Message - One-on-one chat (has receiver ID)
*/

export const messageSchemaTemplate = {
    sender: { type: 'ObjectId', ref: 'User', required: true },
    receiver: { type: 'ObjectId', ref: 'User' },
    classroom: { type: 'ObjectId', ref: 'Classroom' },
    content: { type: String, required: true },
    attachments: [String],
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: 'Date.now' }
};
