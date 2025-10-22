/**
 * Test Configuration
 * Centralized configuration for different test environments
 */

export interface TestConfig {
  baseUrl: string;
  timeout: {
    default: number;
    element: number;
    page: number;
  };
  retry: {
    count: number;
    timeout: number;
  };
  browser: {
    headless: boolean;
    windowSize: {
      width: number;
      height: number;
    };
  };
  mobile: {
    enabled: boolean;
    deviceName: string;
    platformName: string;
    platformVersion: string;
  };
}

export class TestConfigManager {
  private static instance: TestConfigManager;
  private config: TestConfig;

  private constructor() {
    this.config = this.loadDefaultConfig();
  }

  public static getInstance(): TestConfigManager {
    if (!TestConfigManager.instance) {
      TestConfigManager.instance = new TestConfigManager();
    }
    return TestConfigManager.instance;
  }

  private loadDefaultConfig(): TestConfig {
    return {
      baseUrl: 'http://immense-hollows-74271.herokuapp.com',
      timeout: {
        default: 10000,
        element: 15000,
        page: 20000,
      },
      retry: {
        count: 3,
        timeout: 120000,
      },
      browser: {
        headless: process.env.HEADLESS === 'true',
        windowSize: {
          width: 1920,
          height: 1080,
        },
      },
      mobile: {
        enabled: process.env.MOBILE === 'true',
        deviceName: process.env.DEVICE_NAME || 'iPhone X',
        platformName: process.env.PLATFORM_NAME || 'iOS',
        platformVersion: process.env.PLATFORM_VERSION || '15.0',
      },
    };
  }

  public getConfig(): TestConfig {
    return this.config;
  }

  public updateConfig(updates: Partial<TestConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  public isMobile(): boolean {
    return this.config.mobile.enabled;
  }

  public isDesktop(): boolean {
    return !this.config.mobile.enabled;
  }
}
