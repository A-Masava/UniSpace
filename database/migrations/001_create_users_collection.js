// Example migration: Create Users Collection
/*
Migration: Create Users Collection
Date: March 2026

This migration creates the users collection with proper indexes
*/

export const up = async (db) => {
    try {
        await db.createCollection('users');
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
        await db.collection('users').createIndex({ role: 1 });
        console.log('✓ Users collection created');
    } catch (error) {
        console.error('✗ Error creating users collection:', error);
        throw error;
    }
};

export const down = async (db) => {
    try {
        await db.dropCollection('users');
        console.log('✓ Users collection dropped');
    } catch (error) {
        console.error('✗ Error dropping users collection:', error);
        throw error;
    }
};
