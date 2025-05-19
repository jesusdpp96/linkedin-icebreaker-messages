# Analytics Documentation

This document outlines all analytics events implemented in the IceBreaker AI application using PostHog.

## Event Categories

### Acquisition Events
| Event Name | Description | Properties | Location |
|------------|-------------|------------|----------|
| `page_view` | Tracks when a user views a page | `$current_url`, `referrer` | PostHogPageView component |
| `view_examples` | Tracks when a user views message examples in the carousel | `carousel_position`, `message_category` | MessageCarousel component |
| `click_cta` | Tracks when a user clicks on a call-to-action button | `cta_location`, `cta_text` | HeroContent, CTASection components |
| `counter_interaction` | Tracks when a user interacts with the generation counter | `counter_value` | PromoBanner component |

### Activation Events
| Event Name | Description | Properties | Location |
|------------|-------------|------------|----------|
| `form_start` | Tracks when a user starts filling out the message generation form | `first_field` | TryNowForm component |
| `form_field_complete` | Tracks when a user completes a form field | `field_name` | TryNowForm component |
| `form_complete` | Tracks when a user completes all form fields | `time_to_complete` | TryNowForm component |
| `generate_message_request` | Tracks when a user submits the form to generate messages | `form_data_complete` | TryNowSection component |

### Retention Events
| Event Name | Description | Properties | Location |
|------------|-------------|------------|----------|
| `generation_complete` | Tracks when message generation is successfully completed | `generation_count`, `message_count` | MessageResultModal component |
| `message_copy` | Tracks when a user copies a generated message | `message_index`, `message_category` | MessageResultModal component |
| `session_messages` | Tracks the number of messages generated in a session | `message_count` | TryNowSection component |
| `user_return` | Tracks when a user returns to the application | `days_since_last_visit` | PostHogProvider component |

### Quality Events
| Event Name | Description | Properties | Location |
|------------|-------------|------------|----------|
| `generation_time` | Tracks the time taken to generate messages | `duration_ms` | TryNowSection component |
| `generation_error` | Tracks errors during message generation | `error_type`, `error_message` | TryNowSection component |
| `abandon_during_loading` | Tracks when a user leaves during message generation | `time_waited_ms` | MessageResultModal component |

## Implementation Details

### PostHog Configuration
PostHog is configured in the `PostHogProvider.tsx` component with the following settings:
- API host: `/ingest`
- UI host: `https://us.posthog.com`
- Manual page view capture
- Automatic page leave capture
- Debug mode enabled in development

### Event Properties
All events include standard properties:
- `distinct_id`: User's unique identifier
- `time`: Timestamp of the event
- `$current_url`: Current page URL

### Custom Properties
Custom properties are added to events to provide additional context and enable more detailed analysis.

### Session Tracking
Sessions are tracked using PostHog's built-in session tracking capabilities, with custom logic to identify returning users.

## Dashboard Integration
The events implemented support the following dashboards:
- Conversion Funnel Dashboard
- User Behavior Dashboard
- Technical Performance Dashboard

## KPI Tracking
These events enable tracking of the following KPIs:
1. Conversion Rate: Tracked through the funnel from page_view → view_examples → form_start → generate_message_request → generation_complete
2. Copy Rate: Calculated from message_copy events relative to generation_complete events
3. Average Generation Time: Measured through generation_time events
4. 7-Day Retention: Analyzed through user_return events
5. Cost per Generation: Calculated by correlating generation_complete events with system resource usage
