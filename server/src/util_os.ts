import os from 'os';

export function GetLocalInfo()
{
	const networkInterfaces = os.networkInterfaces();
	return Object.values(networkInterfaces).flat().find(info => !info.internal && info.family === 'IPv4');
}
