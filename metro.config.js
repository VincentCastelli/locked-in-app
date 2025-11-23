const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("sql");

// Exclude Prisma from the bundle
config.resolver.blockList = [/prisma\/generated\/.*/, /\.prisma\/.*/];

module.exports = config;
