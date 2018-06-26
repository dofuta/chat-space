# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|


#### Association
- belongs_to :members

<br>

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user

<br>

## group table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

<br>

## message table

|Column|Type|Options|
|------|----|-------|
|text|text||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user
