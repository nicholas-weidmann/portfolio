---
title: Serverless API Monorepo
description: From my game dev project
---

# Serverless API Monorepo

## DynamoDB

### Global Secondary Indexes

| name | description            | pk     | sk     |
| ---- | ---------------------- | ------ | ------ |
| GSI1 | by sk, filter pk       | sk     | pk     |
| GSI2 | by type, filter custom | gsi2pk | gsi2sk |
| GSI3 | by ref, filter pk      | gsi3pk | pk     |

GSI1 is used to swap the partition key and sort key for simple one-to-one and one-to-many relationship queries.
It can be used for many-to-many relationships by querying the other side of the relationship.

GSI2 is used to query by type and filter by a custom sort key.
It can be used to get all items of a type.

GSI3 is used to query by reference and filter by partition key.
It can be used when the sk needs to be unique.

### Relationships

#### **one-to-one by partition**

one character can have one inventory

| type      | pk           | sk           | gsi2pk (type) | gsi3pk (ref) |
| --------- | ------------ | ------------ | ------------- | ------------ |
| Example   | partition#id | type[#id]    | type          | ref#id       |
| Character | Character#id | Character#id | Character     | User#id      |
| Inventory | Character#id | Inventory    | Inventory     | -            |

#### **one-to-many by partition**

one character can have many connections

| type       | pk           | sk            | gsi2pk (type) | gsi3pk (ref) |
| ---------- | ------------ | ------------- | ------------- | ------------ |
| Example    | partition#id | type#id       | type          | ref#id       |
| Character  | Character#id | Character#id  | Character     | User#id      |
| Connection | Character#id | Connection#id | Connection    | -            |

#### **many-to-many by partition**

many books can have many authors and many authors can have many books

bookAuthor contains book specific information about the author

| type       | pk           | sk        | gsi2pk (type) | gsi3pk (ref) |
| ---------- | ------------ | --------- | ------------- | ------------ |
| Example    | partition#id | type#id   | type          | ref#id       |
| Book       | Book#id      | Book#id   | Book          | -            |
| BookAuthor | Book#id      | Author#id | BookAuthor    | -            |
| Author     | Author#id    | Author#id | Author        | -            |

#### **one-to-many by reference**

one user can have many characters

| type      | pk           | sk           | gsi2pk (type) | gsi3pk (ref) |
| --------- | ------------ | ------------ | ------------- | ------------ |
| Example   | partition#id | type#id      | type          | ref#id       |
| User      | User#id      | User#id      | User          | -            |
| Character | Character#id | Character#id | Character     | User#id      |

#### **one-to-one by reference**

this is used to force uniqueness by design with an item that has a id

one character can have one unique name

| type      | pk           | sk           | gsi2pk (type) | gsi3pk (ref) |
| --------- | ------------ | ------------ | ------------- | ------------ |
| Example   | partition#id | type#id      | type          | ref#id       |
| Character | Character#id | Character#id | Character     | User#id      |
| Name      | Name#id      | Name#id      | Name          | Character#id |

#### **one-to-one-to-many by partition and reference**

this is used to force uniqueness by design with an item

one character can have one roomMember and one room can have many roomMembers

| type       | pk           | sk           | gsi2pk (type) | gsi3pk (ref) |
| ---------- | ------------ | ------------ | ------------- | ------------ |
| Example    | partition#id | type[#id]    | type          | ref#id       |
| Character  | Character#id | Character#id | Character     | User#id      |
| RoomMember | Character#id | RoomMember   | RoomMember    | Room#id      |
| Room       | Room#id      | Room#id      | Room          | -            |

### Attributes

| name   | description            | description |
| ------ | ---------------------- | ----------- |
| pk     | most ids               |             |
| sk     | most ids or types      |             |
| gsi2pk | type                   |             |
| gsi2sk | custom per type filter |             |
| gsi3pk | ref                    |             |

### Entities

#### **with type attributes**

| pk          | sk           | gsi2pk (type) | gsi2sk (filter)              | gsi3pk (ref) |
| ----------- | ------------ | ------------- | ---------------------------- | ------------ |
| characterId | characterId  | Character     | birthday                     | sub          |
| characterId | connectionId | Connection    | region                       |              |
| characterId | type         | RoomRequest   | priorityId created roomMapId |              |
| characterId | type         | RoomMember    | roomMapId created            | roomId       |
| roomId      | roomId       | Room          | roomMapId created            |              |
| nameId      | nameId       | Name          | nameId                       | characterId  |

#### **filled example**

| pk                         | sk                         | gsi2pk (type)  | gsi2sk (filter)            | gsi3pk (ref) |
| -------------------------- | -------------------------- | -------------- | -------------------------- | ------------ |
| Character#01               | Character#01               | Character      | 20150311T122706Z           | 01           |
| Character#01               | Connection#01              | Connection     | eu-central-1               |              |
| Character#01               | RoomRequest#               | RoomRequest    | 40#20150311T122706Z#forest |              |
| Character#01               | RoomMember#                | RoomMember     | forest#20150311T122706Z    | 01           |
| Room#01                    | Room#01                    | Room           | forest#20150311T122706Z    |              |
| CharacterName#Ikaros-22299 | CharacterName#Ikaros-22299 | CharacterName# | Ikaros-22299               | 01           |

## regex

### Character Name

```javascript
const re = /^(?=.{2,20}$)([A-Z][a-z]*(([ '][A-Za-z][a-z]*){1,2})?)$/
```

rules are:

- 2-20 chars
- Start with capital letter
- up to 3 words
- Only First Letter Of Word Can Be Capital
- words need to be separated by space or apostrophe

with 5 number id

```javascript
const re = /^(?=.{2,20}-.{5}$)([A-Z][a-z]*(([ '][A-Za-z][a-z]*){1,2})?)-\d{5}$/
```

# Install

## dynamodb local

```bash
docker compose up
sudo chown -R nicho:nicho .docker
```
