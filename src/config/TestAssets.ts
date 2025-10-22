/**
 * Test Assets Configuration
 * Centralized management of test images and files
 */

import path from 'path';

export class TestAssets {
  private static readonly ASSETS_DIR = path.join(process.cwd(), 'test-assets');

  // Test images with different dimensions
  public static readonly IMAGES = {
    CORRECT_SIZE: path.join(TestAssets.ASSETS_DIR, 'test-image-320x320.png'), // 320x320 - Correct size
    TOO_SMALL: path.join(TestAssets.ASSETS_DIR, 'test-image-100x100.png'), // 100x100 - Too small
    TOO_BIG: path.join(TestAssets.ASSETS_DIR, 'test-image-500x500.png'), // 500x500 - Too big
    WRONG_RATIO: path.join(TestAssets.ASSETS_DIR, 'test-image-320x200.png'), // 320x200 - Wrong aspect ratio
  };

  /**
   * Get the correct image path for testing
   */
  public static getCorrectImage(): string {
    return this.IMAGES.CORRECT_SIZE;
  }

  /**
   * Get small image path for testing
   */
  public static getSmallImage(): string {
    return this.IMAGES.TOO_SMALL;
  }

  /**
   * Get large image path for testing
   */
  public static getLargeImage(): string {
    return this.IMAGES.TOO_BIG;
  }

  /**
   * Get wrong ratio image path for testing
   */
  public static getWrongRatioImage(): string {
    return this.IMAGES.WRONG_RATIO;
  }

  /**
   * Get image path by size type
   */
  public static getImageByType(type: 'correct' | 'small' | 'big' | 'wrong-ratio'): string {
    switch (type) {
      case 'correct':
        return this.IMAGES.CORRECT_SIZE;
      case 'small':
        return this.IMAGES.TOO_SMALL;
      case 'big':
        return this.IMAGES.TOO_BIG;
      case 'wrong-ratio':
        return this.IMAGES.WRONG_RATIO;
      default:
        return this.IMAGES.CORRECT_SIZE;
    }
  }
}
