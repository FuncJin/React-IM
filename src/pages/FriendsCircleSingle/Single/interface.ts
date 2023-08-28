import type { FriendsCircleRoleConfigType } from '@api/http/url/interface/friendsCircle'

/** 根据用户双方的关系所得出的权限类型(公开、私有、仅好友、自己、陌生人) */
export type FriendsCircleSingleRole = FriendsCircleRoleConfigType | 'self' | 'stranger'
