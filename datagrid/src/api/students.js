import faker from 'faker';

faker.seed(781);

export const makeFake = (idx) => {
  return {
    "id": idx,
    "name": faker.name.findName(),
    "github": faker.internet.userName(),
    "email": faker.internet.email(),
    "location": faker.address.city(),
    "role": faker.helpers.shuffle(['mentor', 'student', 'activist'])[0],
    "isActive": faker.random.boolean(),
  };
};

const data = [...new Array(1000)].map((_, idx) => makeFake(idx));

export default {
  "data": data
}