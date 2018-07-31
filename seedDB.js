const faker = require('faker');
const fs = require('fs');

const getRandomRecord = (records) =>
	records[faker.random.number(records.length - 1)];

const createCompany = () => ({
	id: faker.random.uuid(),
	name: faker.company.companyName(),
});

const createTeam = (companies) => ({
	id: faker.random.uuid(),
	name: faker.commerce.department(),
	companyId: getRandomRecord(companies).id,
});

const createUser = (teams) => ({
	id: faker.random.uuid(),
	lastName: faker.name.lastName(),
	firstName: faker.name.firstName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
	title: faker.name.jobTitle(),
	createdAt: faker.date.past(),
	teamId: getRandomRecord(teams).id,
});

const companies = new Array(2).fill().map(createCompany);
const teams = new Array(5).fill().map(() => createTeam(companies));
const users = new Array(12).fill().map(() => createUser(teams));

const file = 'db.json';
const data = JSON.stringify({ companies, teams, users }, null, 2);
const cb = (err) => {
  if (err) {
  	throw err;
  }
  console.log(`Seeded ${file}`);
};

fs.writeFile(file, data, cb);