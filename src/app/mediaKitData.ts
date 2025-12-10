// src/data/mediaKitData.ts

// Gerekli Tip Tanımları (ChannelsSection dosyanızdan buraya taşınmıştır)
export type Stats = {
    followers: number;
    videos?: number;
    totalViews?: number;
    avgPostImpressions?: number;
    postEngagementRate?: number;
    avgReelsViews?: number;
    avgDurationSec?: number;
    engagementRate?: number;
};

export type Audience = {
    location: { label: string; value: number }[];
    age: { label: string; value: number }[];
    gender: { male: number; female: number };
};

export type PlatformKey = "tiktok" | "instagram" | "youtube";


// Verilerin Dışa Aktarılması
export const DATA: Record<PlatformKey, { stats: Stats; audience: Audience; url: string; badge: string }> = {
    tiktok: {
        url: "https://www.tiktok.com/@eraytechs",
        badge: "2.3K",
        stats: {
            followers: 2300,
            videos: 39,
            totalViews: 2_100_000,
            avgReelsViews: 18_200,
            engagementRate: 2.25,
            // avgDurationSec: 178, // (Opsiyonel) Eğer TikTok için süre verisi varsa
        },
        audience: {
            location: [
                { label: "Türkiye", value: 94.6 },
                { label: "Azerbaycan", value: 1.6 },
                { label: "Diğer", value: 1.5 },
                { label: "Almanya", value: 0.8 },
                { label: "Bulgaristan", value: 0.5 },
                { label: "Avusturya", value: 0.2 },
                { label: "Hollanda", value: 0.2 },
                { label: "Gürcistan", value: 0.2 },
                { label: "Yunanistan", value: 0.2 },
                { label: "Suudi Arabistan", value: 0.1 },
                { label: "Kuzey Makedonya", value: 0.1 },
            ],
            age: [
                { label: "18–24", value: 26.4 },
                { label: "25–34", value: 34.8 },
                { label: "35–44", value: 19.6 },
                { label: "45–54", value: 12.9 },
                { label: "55+", value: 6.3 },
            ],
            gender: { male: 85.0, female: 15.0 },
        },
    },
    instagram: {
        url: "https://instagram.com/eraytechs",
        badge: "8.3K",
        stats: {
            followers: 8_305,
            videos: 37,
            totalViews: 7_201_720,
            avgPostImpressions: 187_056,
            postEngagementRate: 1.74,
        },
        audience: {
            location: [
                { label: "Türkiye", value: 92.3 },
                { label: "Almanya", value: 1.6 },
                { label: "Azerbaycan", value: 1.5 },
                { label: "Kıbrıs", value: 0.6 },
                { label: "Hindistan", value: 0.4 },
            ],
            age: [
                { label: "13–17", value: 7.4 },
                { label: "18–24", value: 19.8 },
                { label: "25–34", value: 32.2 },
                { label: "35–44", value: 20.7 },
                { label: "45–54", value: 13.1 },
                { label: "55–64", value: 55.64 },
                { label: "65+", value: 2.3 },
            ],
            gender: { male: 94.8, female: 5.2 },
        },
    },
    youtube: {
        url: "https://youtube.com/@eraytechs",
        badge: "474",
        stats: {
            followers: 474,
            videos: 40,
            totalViews: 525_864,
            avgReelsViews: 13_146_3,
        },
        audience: {
            location: [
                { label: "Türkiye", value: 91.0 },
                { label: "Azerbaycan", value: 2.9 },
                { label: "Hollanda", value: 0.5 },
                { label: "Kıbrıs", value: 0.2 },
                { label: "ABD", value: 0.2 },
                { label: "Fransa", value: 0.1 },
                { label: "Birleşik Krallık", value: 0.1 },
                { label: "Bulgaristan", value: 0.1 },
                { label: "Avusturya", value: 0.1 },
            ],
            age: [
                { label: "13–17", value: 5.3 },
                { label: "18–24", value: 24.8 },
                { label: "25–34", value: 41.7 },
                { label: "35–44", value: 18.7 },
                { label: "45–54", value: 7.6 },
                { label: "55–64", value: 1.0 },
                { label: "65+", value: 0.8 },
            ],
            gender: { male: 91, female: 9 },
        },
    },
};