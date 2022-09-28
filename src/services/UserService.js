import $api from "../http";

export default class UserService {
  static async fetchUsers() {
    return await $api.get('/users')
  }

  static async blockUser(userId, blockId) {
    return await $api.post('/users/block', { userId, blockId })
  }

  static async unblockUser(unblockId) {
    return await $api.post('users/unblock', { unblockId })
  }

  static async deleteUser(userId, delId) {
    return await $api.post('/users/delete', { userId, delId })
  }
}