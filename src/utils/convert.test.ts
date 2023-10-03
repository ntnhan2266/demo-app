import { camelCaseKeys, snakeCaseKeys } from '@/utils/convert';

describe('Object Key Transformation Functions', () => {
  const sampleObject = {
    first_name: 'John',
    last_name: 'Doe',
    address_info: {
      street_name: 'Main Street',
      postal_code: '12345',
    },
  };

  test('should camelCase keys of an object', () => {
    const camelCasedObject = camelCaseKeys(sampleObject);

    expect(camelCasedObject).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      addressInfo: {
        streetName: 'Main Street',
        postalCode: '12345',
      },
    });
  });

  test('should snake_case keys of an object', () => {
    const snakeCasedObject = snakeCaseKeys(sampleObject);

    expect(snakeCasedObject).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      address_info: {
        street_name: 'Main Street',
        postal_code: '12345',
      },
    });
  });
});
