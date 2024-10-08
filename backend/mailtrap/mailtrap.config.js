import { MailtrapClient } from "mailtrap";


const TOKEN = '1a849bbaf2fd83989ca539ddc3b52d6b';
const ENDPOINT = 'https://send.api.mailtrap.io';


export const mailtrapClient = new MailtrapClient({
	endpoint: 'https://send.api.mailtrap.io',
  token: '1a849bbaf2fd83989ca539ddc3b52d6b',
});

console.log(mailtrapClient);

export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Burak",
};