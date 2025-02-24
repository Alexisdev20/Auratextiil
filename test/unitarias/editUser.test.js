import { describe, it, vi, expect } from 'vitest';
import edit from '../../users/helpers/edit';

describe('edit user', async () => {
  it('debería llamar a la función edit con los parámetros correctos', async () => {
    const userId = 26;
    const userData = {
      username: 'daniray',
      password: '1234567',
    };

    const responseMuck = await edit(userId, userData);
    const data = responseMuck[0]
    expect(data.username).toBe(userData.username);
    expect(data.password).toBe(userData.password);
  });
});