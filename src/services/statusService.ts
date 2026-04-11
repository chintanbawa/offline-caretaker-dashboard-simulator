import modules from '../data/modules.json';

export function getStatus() {
  return {
    deviceName: 'Edge Node 01',
    connectionState: 'online',
    batteryLevel: 78,
    cpuUsage: 23,
    memoryUsage: 61,
    uptime: 128340,
    modules
  };
}
