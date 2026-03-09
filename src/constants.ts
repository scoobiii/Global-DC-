import { DataCenter } from './types';
import { generateDataCenters } from './dataGenerator';

// Generate 10,000+ Data Centers for a global dataset
export const MOCK_DCS: DataCenter[] = generateDataCenters(10000);
