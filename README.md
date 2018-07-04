# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
5.0.1
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
|name|string|null: false, index: :true|
|email|string|null: false, unique: true|

>nameは検索に使用するので、indexを追加
>emailは一意なものにする

#### Association
- has_many :members
- has_many :groups, through: :memebrs
- has_many :messages
>中間テーブルmembersを通してgroupsと多対多の関係

<br>

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
>これはuserとgroupの中間テーブル.
>references型で外部キー制約.references型のforeign_keyにindex: trueは不要（勝手にindexされる）

#### Association
- belongs_to :group
- belongs_to :user


<br>

## group table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

#### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages
>中間テーブルmembersを通してusersと多対多の関係

<br>

## message table

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
>references型で外部キー制約.references型のforeign_keyにindex: trueは不要（勝手にindexされる）
>テキストと画像（url）が投稿できる
#### Association
- belongs_to :group
- belongs_to :user
