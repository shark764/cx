import * as faker from 'faker';
import { IPayload } from '@cx/types/api';

export const agentInformation = (index: number) => ({
  id: faker.random.uuid(),
  name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
  email: faker.internet.email(),
  team: faker.commerce.color(),
  employmentDate: faker.date.past(),
  employmentEndDate: Math.floor(Math.random() * 10) % index > 5 ? faker.date.past() : null,
  timezone: faker.address.timeZone(),
});

export const allAgentsInformation = new Array(25).fill({}).map((_, index: number) => agentInformation(index));

export const getAgents = () => new Promise((resolve, reject) => {
  if (!allAgentsInformation) {
    return setTimeout(() => reject(new Error('Agents not found')), 1000);
  }

  return setTimeout(() => resolve({ data: allAgentsInformation }), 1000);
});

const timezones = [
  { id: 'Pacific/Niue', label: '(GMT-11:00) Niue' },
  { id: 'Pacific/Pago_Pago', label: '(GMT-11:00) Pago Pago' },
  { id: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii Time' },
  { id: 'Pacific/Rarotonga', label: '(GMT-10:00) Rarotonga' },
  { id: 'Pacific/Tahiti', label: '(GMT-10:00) Tahiti' },
  { id: 'Pacific/Marquesas', label: '(GMT-09:30) Marquesas' },
  { id: 'America/Anchorage', label: '(GMT-09:00) Alaska Time' },
  { id: 'Pacific/Gambier', label: '(GMT-09:00) Gambier' },
  { id: 'America/Los_Angeles', label: '(GMT-08:00) Pacific Time' },
  { id: 'America/Tijuana', label: '(GMT-08:00) Pacific Time - Tijuana' },
  { id: 'America/Vancouver', label: '(GMT-08:00) Pacific Time - Vancouver' },
  { id: 'America/Whitehorse', label: '(GMT-08:00) Pacific Time - Whitehorse' },
  { id: 'Pacific/Pitcairn', label: '(GMT-08:00) Pitcairn' },
  {
    id: 'America/Dawson_Creek',
    label: '(GMT-07:00) Mountain Time - Dawson Creek',
  },
  { id: 'America/Denver', label: '(GMT-07:00) Mountain Time' },
  { id: 'America/Edmonton', label: '(GMT-07:00) Mountain Time - Edmonton' },
  { id: 'America/Hermosillo', label: '(GMT-07:00) Mountain Time - Hermosillo' },
  {
    id: 'America/Mazatlan',
    label: '(GMT-07:00) Mountain Time - Chihuahua, Mazatlan',
  },
  { id: 'America/Phoenix', label: '(GMT-07:00) Mountain Time - Arizona' },
  {
    id: 'America/Yellowknife',
    label: '(GMT-07:00) Mountain Time - Yellowknife',
  },
  { id: 'America/Belize', label: '(GMT-06:00) Belize' },
  { id: 'America/Chicago', label: '(GMT-06:00) Central Time' },
  { id: 'America/Costa_Rica', label: '(GMT-06:00) Costa Rica' },
  { id: 'America/El_Salvador', label: '(GMT-06:00) El Salvador' },
  { id: 'America/Guatemala', label: '(GMT-06:00) Guatemala' },
  { id: 'America/Managua', label: '(GMT-06:00) Managua' },
  {
    id: 'America/Mexico_City',
    label: '(GMT-06:00) Central Time - Mexico City',
  },
  { id: 'America/Regina', label: '(GMT-06:00) Central Time - Regina' },
  {
    id: 'America/Tegucigalpa',
    label: '(GMT-06:00) Central Time - Tegucigalpa',
  },
  { id: 'America/Winnipeg', label: '(GMT-06:00) Central Time - Winnipeg' },
  { id: 'Pacific/Galapagos', label: '(GMT-06:00) Galapagos' },
  { id: 'America/Bogota', label: '(GMT-05:00) Bogota' },
  { id: 'America/Cancun', label: '(GMT-05:00) America Cancun' },
  { id: 'America/Cayman', label: '(GMT-05:00) Cayman' },
  { id: 'America/Guayaquil', label: '(GMT-05:00) Guayaquil' },
  { id: 'America/Havana', label: '(GMT-05:00) Havana' },
  { id: 'America/Iqaluit', label: '(GMT-05:00) Eastern Time - Iqaluit' },
  { id: 'America/Jamaica', label: '(GMT-05:00) Jamaica' },
  { id: 'America/Lima', label: '(GMT-05:00) Lima' },
  { id: 'America/Nassau', label: '(GMT-05:00) Nassau' },
  { id: 'America/New_York', label: '(GMT-05:00) Eastern Time' },
  { id: 'America/Panama', label: '(GMT-05:00) Panama' },
  { id: 'America/Port-au-Prince', label: '(GMT-05:00) Port-au-Prince' },
  { id: 'America/Rio_Branco', label: '(GMT-05:00) Rio Branco' },
  { id: 'America/Toronto', label: '(GMT-05:00) Eastern Time - Toronto' },
  { id: 'Pacific/Easter', label: '(GMT-05:00) Easter Island' },
  { id: 'America/Caracas', label: '(GMT-04:30) Caracas' },
  { id: 'America/Asuncion', label: '(GMT-03:00) Asuncion' },
  { id: 'America/Barbados', label: '(GMT-04:00) Barbados' },
  { id: 'America/Boa_Vista', label: '(GMT-04:00) Boa Vista' },
  { id: 'America/Campo_Grande', label: '(GMT-03:00) Campo Grande' },
  { id: 'America/Cuiaba', label: '(GMT-03:00) Cuiaba' },
  { id: 'America/Curacao', label: '(GMT-04:00) Curacao' },
  { id: 'America/Grand_Turk', label: '(GMT-04:00) Grand Turk' },
  { id: 'America/Guyana', label: '(GMT-04:00) Guyana' },
  { id: 'America/Halifax', label: '(GMT-04:00) Atlantic Time - Halifax' },
  { id: 'America/La_Paz', label: '(GMT-04:00) La Paz' },
  { id: 'America/Manaus', label: '(GMT-04:00) Manaus' },
  { id: 'America/Martinique', label: '(GMT-04:00) Martinique' },
  { id: 'America/Port_of_Spain', label: '(GMT-04:00) Port of Spain' },
  { id: 'America/Porto_Velho', label: '(GMT-04:00) Porto Velho' },
  { id: 'America/Puerto_Rico', label: '(GMT-04:00) Puerto Rico' },
  { id: 'America/Santo_Domingo', label: '(GMT-04:00) Santo Domingo' },
  { id: 'America/Thule', label: '(GMT-04:00) Thule' },
  { id: 'Atlantic/Bermuda', label: '(GMT-04:00) Bermuda' },
  {
    id: 'America/St_Johns',
    label: '(GMT-03:30) Newfoundland Time - St. Johns',
  },
  { id: 'America/Araguaina', label: '(GMT-03:00) Araguaina' },
  { id: 'America/Argentina/Buenos_Aires', label: '(GMT-03:00) Buenos Aires' },
  { id: 'America/Bahia', label: '(GMT-03:00) Salvador' },
  { id: 'America/Belem', label: '(GMT-03:00) Belem' },
  { id: 'America/Cayenne', label: '(GMT-03:00) Cayenne' },
  { id: 'America/Fortaleza', label: '(GMT-03:00) Fortaleza' },
  { id: 'America/Godthab', label: '(GMT-03:00) Godthab' },
  { id: 'America/Maceio', label: '(GMT-03:00) Maceio' },
  { id: 'America/Miquelon', label: '(GMT-03:00) Miquelon' },
  { id: 'America/Montevideo', label: '(GMT-03:00) Montevideo' },
  { id: 'America/Paramaribo', label: '(GMT-03:00) Paramaribo' },
  { id: 'America/Recife', label: '(GMT-03:00) Recife' },
  { id: 'America/Santiago', label: '(GMT-03:00) Santiago' },
  { id: 'America/Sao_Paulo', label: '(GMT-02:00) Sao Paulo' },
  { id: 'Antarctica/Palmer', label: '(GMT-03:00) Palmer' },
  { id: 'Antarctica/Rothera', label: '(GMT-03:00) Rothera' },
  { id: 'Atlantic/Stanley', label: '(GMT-03:00) Stanley' },
  { id: 'America/Noronha', label: '(GMT-02:00) Noronha' },
  { id: 'Atlantic/South_Georgia', label: '(GMT-02:00) South Georgia' },
  { id: 'America/Scoresbysund', label: '(GMT-01:00) Scoresbysund' },
  { id: 'Atlantic/Azores', label: '(GMT-01:00) Azores' },
  { id: 'Atlantic/Cape_Verde', label: '(GMT-01:00) Cape Verde' },
  { id: 'Africa/Abidjan', label: '(GMT+00:00) Abidjan' },
  { id: 'Africa/Accra', label: '(GMT+00:00) Accra' },
  { id: 'Africa/Bissau', label: '(GMT+00:00) Bissau' },
  { id: 'Africa/Casablanca', label: '(GMT+00:00) Casablanca' },
  { id: 'Africa/El_Aaiun', label: '(GMT+00:00) El Aaiun' },
  { id: 'Africa/Monrovia', label: '(GMT+00:00) Monrovia' },
  { id: 'America/Danmarkshavn', label: '(GMT+00:00) Danmarkshavn' },
  { id: 'Atlantic/Canary', label: '(GMT+00:00) Canary Islands' },
  { id: 'Atlantic/Faroe', label: '(GMT+00:00) Faeroe' },
  { id: 'Atlantic/Reykjavik', label: '(GMT+00:00) Reykjavik' },
  { id: 'Etc/GMT', label: '(GMT+00:00) GMT (no daylight saving)' },
  { id: 'Europe/Dublin', label: '(GMT+00:00) Dublin' },
  { id: 'Europe/Lisbon', label: '(GMT+00:00) Lisbon' },
  { id: 'Europe/London', label: '(GMT+00:00) London' },
  { id: 'Africa/Algiers', label: '(GMT+01:00) Algiers' },
  { id: 'Africa/Ceuta', label: '(GMT+01:00) Ceuta' },
  { id: 'Africa/Lagos', label: '(GMT+01:00) Lagos' },
  { id: 'Africa/Ndjamena', label: '(GMT+01:00) Ndjamena' },
  { id: 'Africa/Tunis', label: '(GMT+01:00) Tunis' },
  { id: 'Africa/Windhoek', label: '(GMT+02:00) Windhoek' },
  { id: 'Europe/Amsterdam', label: '(GMT+01:00) Amsterdam' },
  { id: 'Europe/Andorra', label: '(GMT+01:00) Andorra' },
  {
    id: 'Europe/Belgrade',
    label: '(GMT+01:00) Central European Time - Belgrade',
  },
  { id: 'Europe/Berlin', label: '(GMT+01:00) Berlin' },
  { id: 'Europe/Brussels', label: '(GMT+01:00) Brussels' },
  { id: 'Europe/Budapest', label: '(GMT+01:00) Budapest' },
  { id: 'Europe/Copenhagen', label: '(GMT+01:00) Copenhagen' },
  { id: 'Europe/Gibraltar', label: '(GMT+01:00) Gibraltar' },
  { id: 'Europe/Luxembourg', label: '(GMT+01:00) Luxembourg' },
  { id: 'Europe/Madrid', label: '(GMT+01:00) Madrid' },
  { id: 'Europe/Malta', label: '(GMT+01:00) Malta' },
  { id: 'Europe/Monaco', label: '(GMT+01:00) Monaco' },
  { id: 'Europe/Oslo', label: '(GMT+01:00) Oslo' },
  { id: 'Europe/Paris', label: '(GMT+01:00) Paris' },
  { id: 'Europe/Prague', label: '(GMT+01:00) Central European Time - Prague' },
  { id: 'Europe/Rome', label: '(GMT+01:00) Rome' },
  { id: 'Europe/Stockholm', label: '(GMT+01:00) Stockholm' },
  { id: 'Europe/Tirane', label: '(GMT+01:00) Tirane' },
  { id: 'Europe/Vienna', label: '(GMT+01:00) Vienna' },
  { id: 'Europe/Warsaw', label: '(GMT+01:00) Warsaw' },
  { id: 'Europe/Zurich', label: '(GMT+01:00) Zurich' },
  { id: 'Africa/Cairo', label: '(GMT+02:00) Cairo' },
  { id: 'Africa/Johannesburg', label: '(GMT+02:00) Johannesburg' },
  { id: 'Africa/Maputo', label: '(GMT+02:00) Maputo' },
  { id: 'Africa/Tripoli', label: '(GMT+02:00) Tripoli' },
  { id: 'Asia/Amman', label: '(GMT+02:00) Amman' },
  { id: 'Asia/Beirut', label: '(GMT+02:00) Beirut' },
  { id: 'Asia/Damascus', label: '(GMT+02:00) Damascus' },
  { id: 'Asia/Gaza', label: '(GMT+02:00) Gaza' },
  { id: 'Asia/Jerusalem', label: '(GMT+02:00) Jerusalem' },
  { id: 'Asia/Nicosia', label: '(GMT+02:00) Nicosia' },
  { id: 'Europe/Athens', label: '(GMT+02:00) Athens' },
  { id: 'Europe/Bucharest', label: '(GMT+02:00) Bucharest' },
  { id: 'Europe/Chisinau', label: '(GMT+02:00) Chisinau' },
  { id: 'Europe/Helsinki', label: '(GMT+02:00) Helsinki' },
  { id: 'Europe/Istanbul', label: '(GMT+02:00) Istanbul' },
  { id: 'Europe/Kaliningrad', label: '(GMT+02:00) Moscow-01 - Kaliningrad' },
  { id: 'Europe/Kiev', label: '(GMT+02:00) Kiev' },
  { id: 'Europe/Riga', label: '(GMT+02:00) Riga' },
  { id: 'Europe/Sofia', label: '(GMT+02:00) Sofia' },
  { id: 'Europe/Tallinn', label: '(GMT+02:00) Tallinn' },
  { id: 'Europe/Vilnius', label: '(GMT+02:00) Vilnius' },
  { id: 'Africa/Khartoum', label: '(GMT+03:00) Khartoum' },
  { id: 'Africa/Nairobi', label: '(GMT+03:00) Nairobi' },
  { id: 'Antarctica/Syowa', label: '(GMT+03:00) Syowa' },
  { id: 'Asia/Baghdad', label: '(GMT+03:00) Baghdad' },
  { id: 'Asia/Qatar', label: '(GMT+03:00) Qatar' },
  { id: 'Asia/Riyadh', label: '(GMT+03:00) Riyadh' },
  { id: 'Europe/Minsk', label: '(GMT+03:00) Minsk' },
  { id: 'Europe/Moscow', label: '(GMT+03:00) Moscow+00 - Moscow' },
  { id: 'Asia/Tehran', label: '(GMT+03:30) Tehran' },
  { id: 'Asia/Baku', label: '(GMT+04:00) Baku' },
  { id: 'Asia/Dubai', label: '(GMT+04:00) Dubai' },
  { id: 'Asia/Tbilisi', label: '(GMT+04:00) Tbilisi' },
  { id: 'Asia/Yerevan', label: '(GMT+04:00) Yerevan' },
  { id: 'Europe/Samara', label: '(GMT+04:00) Moscow+01 - Samara' },
  { id: 'Indian/Mahe', label: '(GMT+04:00) Mahe' },
  { id: 'Indian/Mauritius', label: '(GMT+04:00) Mauritius' },
  { id: 'Indian/Reunion', label: '(GMT+04:00) Reunion' },
  { id: 'Asia/Kabul', label: '(GMT+04:30) Kabul' },
  { id: 'Antarctica/Mawson', label: '(GMT+05:00) Mawson' },
  { id: 'Asia/Aqtau', label: '(GMT+05:00) Aqtau' },
  { id: 'Asia/Aqtobe', label: '(GMT+05:00) Aqtobe' },
  { id: 'Asia/Ashgabat', label: '(GMT+05:00) Ashgabat' },
  { id: 'Asia/Dushanbe', label: '(GMT+05:00) Dushanbe' },
  { id: 'Asia/Karachi', label: '(GMT+05:00) Karachi' },
  { id: 'Asia/Tashkent', label: '(GMT+05:00) Tashkent' },
  { id: 'Asia/Yekaterinburg', label: '(GMT+05:00) Moscow+02 - Yekaterinburg' },
  { id: 'Indian/Kerguelen', label: '(GMT+05:00) Kerguelen' },
  { id: 'Indian/Maldives', label: '(GMT+05:00) Maldives' },
  { id: 'Asia/Calcutta', label: '(GMT+05:30) India Standard Time' },
  { id: 'Asia/Colombo', label: '(GMT+05:30) Colombo' },
  { id: 'Asia/Katmandu', label: '(GMT+05:45) Katmandu' },
  { id: 'Antarctica/Vostok', label: '(GMT+06:00) Vostok' },
  { id: 'Asia/Almaty', label: '(GMT+06:00) Almaty' },
  { id: 'Asia/Bishkek', label: '(GMT+06:00) Bishkek' },
  { id: 'Asia/Dhaka', label: '(GMT+06:00) Dhaka' },
  { id: 'Asia/Omsk', label: '(GMT+06:00) Moscow+03 - Omsk, Novosibirsk' },
  { id: 'Asia/Thimphu', label: '(GMT+06:00) Thimphu' },
  { id: 'Indian/Chagos', label: '(GMT+06:00) Chagos' },
  { id: 'Asia/Rangoon', label: '(GMT+06:30) Rangoon' },
  { id: 'Indian/Cocos', label: '(GMT+06:30) Cocos' },
  { id: 'Antarctica/Davis', label: '(GMT+07:00) Davis' },
  { id: 'Asia/Bangkok', label: '(GMT+07:00) Bangkok' },
  { id: 'Asia/Hovd', label: '(GMT+07:00) Hovd' },
  { id: 'Asia/Jakarta', label: '(GMT+07:00) Jakarta' },
  { id: 'Asia/Krasnoyarsk', label: '(GMT+07:00) Moscow+04 - Krasnoyarsk' },
  { id: 'Asia/Saigon', label: '(GMT+07:00) Hanoi' },
  { id: 'Asia/Ho_Chi_Minh', label: '(GMT+07:00) Ho Chi Minh' },
  { id: 'Indian/Christmas', label: '(GMT+07:00) Christmas' },
  { id: 'Antarctica/Casey', label: '(GMT+08:00) Casey' },
  { id: 'Asia/Brunei', label: '(GMT+08:00) Brunei' },
  { id: 'Asia/Choibalsan', label: '(GMT+08:00) Choibalsan' },
  { id: 'Asia/Hong_Kong', label: '(GMT+08:00) Hong Kong' },
  { id: 'Asia/Irkutsk', label: '(GMT+08:00) Moscow+05 - Irkutsk' },
  { id: 'Asia/Kuala_Lumpur', label: '(GMT+08:00) Kuala Lumpur' },
  { id: 'Asia/Macau', label: '(GMT+08:00) Macau' },
  { id: 'Asia/Makassar', label: '(GMT+08:00) Makassar' },
  { id: 'Asia/Manila', label: '(GMT+08:00) Manila' },
  { id: 'Asia/Shanghai', label: '(GMT+08:00) China Time - Beijing' },
  { id: 'Asia/Singapore', label: '(GMT+08:00) Singapore' },
  { id: 'Asia/Taipei', label: '(GMT+08:00) Taipei' },
  { id: 'Asia/Ulaanbaatar', label: '(GMT+08:00) Ulaanbaatar' },
  { id: 'Australia/Perth', label: '(GMT+08:00) Western Time - Perth' },
  { id: 'Asia/Pyongyang', label: '(GMT+08:30) Pyongyang' },
  { id: 'Asia/Dili', label: '(GMT+09:00) Dili' },
  { id: 'Asia/Jayapura', label: '(GMT+09:00) Jayapura' },
  { id: 'Asia/Seoul', label: '(GMT+09:00) Seoul' },
  { id: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo' },
  { id: 'Asia/Yakutsk', label: '(GMT+09:00) Moscow+06 - Yakutsk' },
  { id: 'Pacific/Palau', label: '(GMT+09:00) Palau' },
  { id: 'Australia/Adelaide', label: '(GMT+10:30) Central Time - Adelaide' },
  { id: 'Australia/Darwin', label: '(GMT+09:30) Central Time - Darwin' },
  { id: 'Antarctica/DumontDUrville', label: "(GMT+10:00) Dumont D'Urville" },
  { id: 'Asia/Magadan', label: '(GMT+10:00) Moscow+07 - Magadan' },
  {
    id: 'Asia/Vladivostok',
    label: '(GMT+10:00) Moscow+07 - Yuzhno-Sakhalinsk',
  },
  { id: 'Australia/Brisbane', label: '(GMT+10:00) Eastern Time - Brisbane' },
  { id: 'Australia/Hobart', label: '(GMT+11:00) Eastern Time - Hobart' },
  {
    id: 'Australia/Sydney',
    label: '(GMT+11:00) Eastern Time - Melbourne, Sydney',
  },
  { id: 'Pacific/Chuuk', label: '(GMT+10:00) Truk' },
  { id: 'Pacific/Guam', label: '(GMT+10:00) Guam' },
  { id: 'Pacific/Port_Moresby', label: '(GMT+10:00) Port Moresby' },
  { id: 'Pacific/Efate', label: '(GMT+11:00) Efate' },
  { id: 'Pacific/Guadalcanal', label: '(GMT+11:00) Guadalcanal' },
  { id: 'Pacific/Kosrae', label: '(GMT+11:00) Kosrae' },
  { id: 'Pacific/Norfolk', label: '(GMT+11:00) Norfolk' },
  { id: 'Pacific/Noumea', label: '(GMT+11:00) Noumea' },
  { id: 'Pacific/Pohnpei', label: '(GMT+11:00) Ponape' },
  {
    id: 'Asia/Kamchatka',
    label: '(GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy',
  },
  { id: 'Pacific/Auckland', label: '(GMT+13:00) Auckland' },
  { id: 'Pacific/Fiji', label: '(GMT+13:00) Fiji' },
  { id: 'Pacific/Funafuti', label: '(GMT+12:00) Funafuti' },
  { id: 'Pacific/Kwajalein', label: '(GMT+12:00) Kwajalein' },
  { id: 'Pacific/Majuro', label: '(GMT+12:00) Majuro' },
  { id: 'Pacific/Nauru', label: '(GMT+12:00) Nauru' },
  { id: 'Pacific/Tarawa', label: '(GMT+12:00) Tarawa' },
  { id: 'Pacific/Wake', label: '(GMT+12:00) Wake' },
  { id: 'Pacific/Wallis', label: '(GMT+12:00) Wallis' },
  { id: 'Pacific/Apia', label: '(GMT+14:00) Apia' },
  { id: 'Pacific/Enderbury', label: '(GMT+13:00) Enderbury' },
  { id: 'Pacific/Fakaofo', label: '(GMT+13:00) Fakaofo' },
  { id: 'Pacific/Tongatapu', label: '(GMT+13:00) Tongatapu' },
  { id: 'Pacific/Kiritimati', label: '(GMT+14:00) Kiritimati' },
];

export const getTimezones = () => new Promise((resolve, reject) => {
  if (!timezones) {
    return setTimeout(() => reject(new Error('Timezones not found')), 1000);
  }

  return setTimeout(() => resolve({ data: timezones }), 3000);
});

const teams = Array.from(new Set(new Array(25).fill({}).map(() => faker.commerce.color()))).map((t) => ({
  id: t,
  label: t,
}));

export const getTeams = () => new Promise((resolve, reject) => {
  if (!teams) {
    return setTimeout(() => reject(new Error('Teams not found')), 1000);
  }

  return setTimeout(() => resolve({ data: teams }), 2000);
});

export const organization = (agentId: string) => ({
  id: faker.random.uuid(),
  agentId,
  team: faker.commerce.color(),
  validFrom: faker.date.past(),
  validTo: faker.date.past(),
});

export const allOrganization: any = [];
allAgentsInformation.forEach((agent) => {
  const nOrganization = Math.floor(Math.random() * 6);
  const agentHistory = new Array(nOrganization).fill({}).map(() => organization(agent.id));
  agentHistory.forEach((history: any) => {
    allOrganization.push(history);
  });
});

export const getAgentOrganizationHistory = (agentId: string) => new Promise((resolve, reject) => {
  if (!allOrganization) {
    return setTimeout(() => reject(new Error('Organization history not found')), 1000);
  }

  const agentOrganizationHistory = allOrganization.filter((item: any) => item.agentId === agentId);

  // if (!agentOrganizationHistory.length) {
  //   return setTimeout(() => reject(new Error('Agent organization history not found')), 1000);
  // }

  return setTimeout(() => resolve({ data: agentOrganizationHistory }), 1000);
});

export const updateAgent = async ({ id, payload }: IPayload) => new Promise((resolve, reject) => {
  const index = allAgentsInformation.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Agent not found')), 1000);
  }

  const { validFrom, validTo, ...values } = payload;
  const result = { ...allAgentsInformation[index], ...values };
  allAgentsInformation[index] = result;

  if (validFrom && validTo) {
    allOrganization.push({
      id: faker.random.uuid(),
      agentId: id,
      team: result.team,
      validFrom,
      validTo,
    });
  }

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Updated successfully' }), 2000);
});
