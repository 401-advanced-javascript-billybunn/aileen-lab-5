const Categories = require('../../models-singular/categories.js');
let categories = new Categories();

const supergoose = require('../supergoose.js');

describe('Categories Model (Singular)', () => {
  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', () => {
    let obj = { name: 'Test category 1', description: 'Test description 1' };
    return categories.create(obj).then(category => {
      Object.keys(obj).forEach(key => {
        expect(category[key]).toEqual(obj[key]);
      });
    });
  });

  it('can get() a category', () => {
    let obj = { name: 'Test category 2', description: 'Test description 2' };
    return categories.create(obj).then(record => {
      return categories.get(record._id).then(category => {
        Object.keys(obj).forEach(key => {
          expect(category[key]).toEqual(obj[key]);
        });
      });
    });
  });

  it('can get() all categories', () => {
    let obj = { name: 'Test category 3', description: 'Test description 3' };
    return categories.create(obj).then(record => {
      return categories.get().then(results => {
        console.log({ results });
        expect(Array.isArray(results)).toBe(true);
        expect(results.length.toBe(3)); // 3 added so far in test
      });
    });
  });

  xit('can update() a category', () => {});

  xit('can delete() a category', () => {});
});
