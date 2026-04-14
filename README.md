# Offline-First Device Simulator for Caretaker Dashboard

A lightweight Node.js and Express device simulator that acts as a nearby edge device for the **Offline-First React Native Caretaker Dashboard** mobile app.

This project exists to provide a realistic local API target for the mobile app over Wi-Fi. It simulates device health, logs, backup history, command handling, and simplified signed package deployment.

## Related Repository

This simulator is the helper service for the companion React Native mobile app:

**Mobile App Repo:** `https://github.com/chintanbawa/offline-caretaker-dashboard-rn`

The mobile app uses this simulator as a nearby edge device over local network HTTP.

## Purpose

This simulator is intentionally simple. It is not pretending to be a full robotics controller, industrial runtime, or production hardware stack.

Its job is to provide a realistic local API surface for:

* device connectivity testing
* device snapshot sync
* structured logs
* backup history
* command submission
* signed package deployment testing

## Features

* Local HTTP API over Wi-Fi
* Health endpoint
* Device status endpoint
* Structured logs endpoint
* Backup history endpoint
* Command endpoint
* Deploy endpoint with simplified signature verification
* JSON-backed simulator state and deployment history
* Easy to run locally on a laptop or move later to a Raspberry Pi

## Tech Stack

* Node.js
* TypeScript
* Express
* Zod
* JSON file storage
* Node crypto utilities

## API Endpoints

### `GET /health`

Simple health check endpoint.

Example response:

```json
{
  "ok": true,
  "service": "device-simulator",
  "timestamp": "2026-04-15T10:00:00.000Z"
}
```

### `GET /status`

Returns the current simulated device state and module health.

### `GET /logs`

Returns structured diagnostic logs.

### `GET /backups`

Returns backup history entries.

### `POST /commands`

Accepts command payloads such as module restart requests.

Example request:

```json
{
  "type": "RESTART_MODULE",
  "payload": {
    "module": "Motion Control"
  }
}
```

### `POST /deploy`

Accepts signed package deployment requests.

Example request:

```json
{
  "packageName": "skill-navigation-v1",
  "version": "1.0.0",
  "signature": "abc123",
  "payload": {
    "rules": ["avoid-obstacle", "low-speed-mode"]
  }
}
```

## Project Structure

```text
src/
├── app.ts
├── server.ts
├── routes/
├── services/
├── data/
└── utils/
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/chintanbawa/offline-caretaker-dashboard-simulator
cd offline-caretaker-dashboard-simulator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the simulator

```bash
npm run dev
```

By default, the server runs on:

`http://0.0.0.0:3000`

On your local network, access it using your machine's local IP, for example:

`http://192.168.1.10:3000`

## Environment Notes

You can optionally provide:

* `PORT`
* `HOST`
* `SIGNING_SEED`

Example:

```bash
PORT=3000 HOST=0.0.0.0 SIGNING_SEED=use-secure-seed-text-here npm run dev
```

## How it works with the mobile app

1. Start this simulator on your laptop or local machine
2. Ensure the mobile device and laptop are on the same Wi-Fi network
3. Save the simulator base URL inside the mobile app settings screen
4. Use the mobile app to:

   * test connection
   * sync device data
   * queue commands
   * deploy signed packages
   * retry failed actions

## Signing Model

The deploy signature verification used here is intentionally simplified.

It exists to demonstrate:

* payload canonicalization
* deterministic signature generation
* basic integrity verification
* realistic validation boundaries

It does **not** claim hardened production-grade package security.

## Data Storage

This simulator uses local JSON files for simplicity:

* `logs.json`
* `backups.json`
* `modules.json`
* `deployed-packages.json`

That is deliberate. This project is meant to simulate a nearby device API surface, not build a second unnecessary persistence system.

## Limitations

* Not real hardware
* Not ROS-based
* No BLE
* No cloud connectivity
* No authentication system
* Simplified signature verification only
* JSON file persistence only
* Not intended as a production device runtime

## Related Links

* Device Simulator Repo: `https://github.com/chintanbawa/offline-caretaker-dashboard-simulator`
* Mobile App Repo: `https://github.com/chintanbawa/offline-caretaker-dashboard-rn`
