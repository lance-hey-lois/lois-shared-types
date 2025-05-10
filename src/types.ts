// src/types.ts
import { ObjectId } from 'mongodb';

// --- TempMessage Types (Based on provided JSON example) ---

export interface MessageHeaderParticipant {
  email?: string; // Made optional based on structure
  name?: string;  // Made optional based on structure
}

export interface Header {
  from?: MessageHeaderParticipant[];
  to?: MessageHeaderParticipant[];
  cc?: MessageHeaderParticipant[];
  bcc?: MessageHeaderParticipant[];
  subject?: string;
  date?: string; // Kept as string based on example 'Thu, 6 Feb 2025...'
  'message-id'?: string; // Allow specific headers
  // Allow other standard headers as strings
  [key: string]: MessageHeaderParticipant[] | string | undefined;
}

export interface Body {
  mimeType: string;
  data: string; // Base64 encoded data
}

// Main Temp Message Interface based on JSON
export interface TempMessage {
  _id: ObjectId; // Use ObjectId type
  userId: string; // User slug like 'masseyl'
  messageId: string;
  threadId: string;
  internalDate: string; // Kept as string based on example '1738873226000'
  headers: Header;
  bodies: Body[];
  createdAt?: Date; // Added for completeness, common field
  updatedAt: Date; // Represent $date as Date
  // Optional fields from previous analysis, if needed later
  // needsAnalysis?: boolean;
  // analysisStatus?: AnalysisStatus; // Define AnalysisStatus if required
  // importBatchId?: string;
}

// --- Profile Types (Consolidated) ---

// Common fields for both profiles
export interface BaseProfile {
  name: string;
  email: string; // Primary email
  title?: string;
  company?: string;
  locatedIn?: string;
  linkedIn?: string;
  blurb?: string;
  midTermPriorities?: {
    goals?: string[];
    lookingFor?: string[];
  };
  areasOfNetworkStrength?: string[];
  canHelpWith?: string[];
  passionsAndInterests?: string[];
  personalityTraits?: string[];
  shortPitch?: string;
  relevantDetails?: string;
  communicationStyle?: string;
  embedding?: number[]; // Changed to array of numbers
  updatedAt: Date;
}

// Consolidated Private profile
export interface PrivateProfile extends BaseProfile {
  _id: ObjectId;
  userId: string; // Link to the user owner (Using string 'slug' based on TempMessage example)
  slug?: string; // Unique identifier for the profile itself
  showInNetworkSearch?: boolean; // Added showInNetworkSearch property
  relationshipStrength?: { // Using the more detailed structure
    score?: number;
    assessment?: string; // Renamed from relationshipAssessment
    factors?: { // Optional factors if available
      graphStrength?: number;
      messageCount?: number;
      threadCount?: number;
      responseRate?: number;
    };
  };
  lastContacted?: Date;
  initialProcessedAt?: Date;
}

// Consolidated Public profile
/**
 * Public profile for sharing/display
 */
export interface PublicProfile extends BaseProfile {
  _id?: ObjectId; // Make _id optional
  slug?: string;
  // PublicProfile specific fields can be added here if needed in the future
}

// --- Other potential shared types from previous analysis (optional) ---

// Example: Contact Info if needed separately
export interface ContactInfo {
  email: string;
  name?: string;
  title?: string;
  company?: string;
  linkedIn?: string;
  locatedIn?: string;
}
