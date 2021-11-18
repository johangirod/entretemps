const DAILY_TIME = [6, 30] as Time;

const hourRegex = `[0-9]|(?:[01][0-9])|(?:2[0-3])`;
const minuteRegex = `[0-6][0-9]`;
const timeRegex = new RegExp(`(?<hour>${hourRegex})h(?<minute>${minuteRegex})?`);

type Time = [number, number];

function parseTime(time: string): Time | undefined {
	if (time === '1') {
		return DAILY_TIME;
	}
	if (time === '0.5') {
		return DAILY_TIME.map((time) => time / 2) as Time;
	}
	const match = time.match(timeRegex);
	if (!match) {
		throw new Error(`Temps mal formatté ${time}`);
	}
	return match.slice(1).map((x) => Number.parseInt(x ?? '0')) as Time;
}

function computeDuration([fromHour, fromMinute]: Time, [toHour, toMinute]: Time): Time {
	console.log();
	return [toHour - fromHour - (toMinute < fromMinute ? 1 : 0), (toMinute - fromMinute + 60) % 60];
}

function addTime(a: Time, b: Time): Time {
	const totalMinutes = a[1] + b[1];
	return [a[0] + b[0] + Math.floor(totalMinutes / 60), totalMinutes % 60];
}

export function computeTotalTime(text: string): string {
	const [hours, minutes] = text
		.split('\n')
		.flatMap((line) =>
			line
				.replace(/^.*:/, '')
				.replace(/[\s]/g, '')
				.split('/')
				.filter(Boolean)
				.map((t) => t.split('-').map(parseTime))
		)
		.map((timespan: [Time] | [Time, Time]) =>
			timespan.length === 1 ? timespan[0] : computeDuration(...timespan)
		)
		.reduce(addTime, [0, 0] as Time);
	return formatDays.format((hours + minutes / 60) / (DAILY_TIME[0] + DAILY_TIME[1] / 60));

	// return `${hours}h${minutes >= 1 ? formatMinute.format(minutes) : ''}`;
}

const formatDays = new Intl.NumberFormat('fr', {
	maximumFractionDigits: 2
});
