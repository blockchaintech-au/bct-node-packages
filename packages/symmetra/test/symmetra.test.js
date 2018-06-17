import symm from '../src/symmetra';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

describe('Test symmetra http client', () => {
  test('get', async () => {
    const user = await symm.get(`${BASE_URL}users/1`);
    expect(user.id).toEqual(1);
  });

  test('post', async () => {
    const user = await symm.post(`${BASE_URL}users`);
    expect(user.id).toEqual(11);
  });

  test('put', async () => {
    const user = await symm.put(`${BASE_URL}users/1`);
    expect(user.id).toEqual(1);
  });

  test('delete', async () => {
    const res = await symm.delete(`${BASE_URL}users/1`);
    expect(res).toEqual({});
  });

  test('error result', async () => {
    try {
      await symm.get(`${BASE_URL}users/11`);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('custom symmetra', async () => {
    const customSymm = symm.create({
      baseURL: BASE_URL,
    });
    const user = await customSymm.get('users/1');
    expect(user.id).toEqual(1);
  });

  test('full response', async () => {
    const res = await symm.get(`${BASE_URL}users/1`, {
      full: true,
    });
    expect(res.status).toEqual(200);
    expect(res.data.id).toEqual(1);
  });
});
