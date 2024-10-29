import { MaterialCommunityIcons } from '@expo/vector-icons';

const wmoIcons: { [key: number]: keyof typeof MaterialCommunityIcons.glyphMap } = {
  0: 'weather-sunny', // Clear sky
  1: 'weather-partly-cloudy', // Mainly clear
  2: 'weather-cloudy', // State of sky on the whole unchanged
  3: 'weather-cloudy', // Clouds generally forming or developing
  4: 'weather-hazy', // Visibility reduced by smoke, e.g. veldt or forest fires, industrial smoke or volcanic ashes
  5: 'weather-hazy', // Haze
  6: 'weather-hazy', // Widespread dust in suspension in the air, not raised by wind at or near the station at the time of observation
  7: 'weather-hazy', // Dust or sand raised by wind at or near the station at the time of observation, but no well developed dust whirl(s) or sand whirl(s), and no duststorm or sandstorm seen
  8: 'weather-hazy', // Well developed dust whirl(s) or sand whirl(s) seen at or near the station during the preceding hour or at the time of observation, but no duststorm or sandstorm
  9: 'weather-hazy', // Duststorm or sandstorm within sight at the time of observation, or at the station during the preceding hour
  10: 'weather-fog', // Mist
  11: 'weather-fog', // Patches shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea
  12: 'weather-fog', // More or less continuous
  13: 'weather-lightning', // Lightning visible, no thunder heard
  14: 'weather-rainy', // Precipitation within sight, not reaching the ground or the surface of the sea
  15: 'weather-rainy', // Precipitation within sight, reaching the ground or the surface of the sea, but distant, i.e. estimated to be more than 5 km from the station
  16: 'weather-rainy', // Precipitation within sight, reaching the ground or the surface of the sea, near to, but not at the station
  17: 'weather-lightning', // Thunderstorm, but no precipitation at the time of observation
  18: 'weather-windy', // Squalls at or within sight of the station during the preceding hour or at the time of observation
  20: 'weather-fog', // Fog or ice fog at a distance at the time of observation, but not at the station
  21: 'weather-fog', // Precipitation at a distance at the time of observation, but not at the station
  22: 'weather-fog', // Drizzle (not freezing) at a distance at the time of observation, but not at the station
  23: 'weather-fog', // Rain (not freezing) at a distance at the time of observation, but not at the station
  24: 'weather-fog', // Snow at a distance at the time of observation, but not at the station
  25: 'weather-fog', // Freezing drizzle or freezing rain at a distance at the time of observation, but not at the station
  26: 'weather-fog', // Thunderstorm (with or without precipitation) at a distance at the time of observation, but not at the station
  27: 'weather-fog', // Blowing or drifting snow at a distance at the time of observation, but not at the station
  28: 'weather-fog', // Squalls at a distance at the time of observation, but not at the station
  29: 'weather-fog', // Funnel cloud(s) at a distance at the time of observation, but not at the station
  30: 'weather-fog', // Slight or moderate duststorm or sandstorm within sight, but not at the station
  31: 'weather-fog', // Slight or moderate duststorm or sandstorm has decreased during the past hour
  32: 'weather-fog', // Slight or moderate duststorm or sandstorm no appreciable change during the past hour
  33: 'weather-fog', // Slight or moderate duststorm or sandstorm has begun or increased during the past hour
  34: 'weather-fog', // Severe duststorm or sandstorm within sight, but not at the station
  35: 'weather-fog', // Severe duststorm or sandstorm has decreased during the past hour
  36: 'weather-fog', // Severe duststorm or sandstorm no appreciable change during the past hour
  37: 'weather-fog', // Severe duststorm or sandstorm has begun or increased during the past hour
  38: 'weather-fog', // Blowing snow, generally low (below eye level)
  39: 'weather-fog', // Blowing snow, generally high (above eye level)
  40: 'weather-fog', // Fog or ice fog in patches
  41: 'weather-fog', // Fog or ice fog, sky visible, has become thinner during the past hour
  42: 'weather-fog', // Fog or ice fog, sky visible, no appreciable change during the past hour
  43: 'weather-fog', // Fog or ice fog, sky visible, has begun or become thicker during the past hour
  44: 'weather-fog', // Fog or ice fog, sky invisible, has become thinner during the past hour
  45: 'weather-fog', // Fog or ice fog, sky invisible, no appreciable change during the past hour
  46: 'weather-fog', // Fog or ice fog, sky invisible, has begun or become thicker during the past hour
  47: 'weather-fog', // Fog, depositing rime, sky visible
  48: 'weather-fog', // Depositing rime fog
  50: 'weather-rainy', // Drizzle, not freezing, intermittent, slight at time of observation
  51: 'weather-rainy', // Drizzle, not freezing, continuous, slight at time of observation
  52: 'weather-rainy', // Drizzle, not freezing, intermittent, moderate at time of observation
  53: 'weather-rainy', // Drizzle, not freezing, continuous, moderate at time of observation
  54: 'weather-rainy', // Drizzle, not freezing, intermittent, dense at time of observation
  55: 'weather-rainy', // Drizzle, not freezing, continuous, dense at time of observation
  56: 'weather-snowy-rainy', // Drizzle, freezing, slight
  57: 'weather-snowy-rainy', // Drizzle, freezing, moderate or dense
  58: 'weather-snowy-rainy', // Drizzle and rain, slight
  59: 'weather-snowy-rainy', // Drizzle and rain, moderate or dense
  60: 'weather-pouring', // Rain, not freezing, intermittent, slight at time of observation
  61: 'weather-pouring', // Rain, not freezing, continuous, slight at time of observation
  62: 'weather-pouring', // Rain, not freezing, intermittent, moderate at time of observation
  63: 'weather-pouring', // Rain, not freezing, continuous, moderate at time of observation
  64: 'weather-pouring', // Rain, not freezing, intermittent, heavy at time of observation
  65: 'weather-pouring', // Rain, not freezing, continuous, heavy at time of observation
  66: 'weather-snowy-rainy', // Freezing Rain: Light
  67: 'weather-snowy-rainy', // Freezing Rain: Heavy
  68: 'weather-snowy-rainy', // Rain or drizzle and snow, slight
  69: 'weather-snowy-rainy', // Rain or drizzle and snow, moderate or heavy
  70: 'weather-snowy', // Intermittent fall of snowflakes, slight at time of observation
  71: 'weather-snowy', // Continuous fall of snowflakes, slight at time of observation
  72: 'weather-snowy', // Intermittent fall of snowflakes, moderate at time of observation
  73: 'weather-snowy', // Continuous fall of snowflakes, moderate at time of observation
  74: 'weather-snowy', // Intermittent fall of snowflakes, heavy at time of observation
  75: 'weather-snowy', // Continuous fall of snowflakes, heavy at time of observation
  76: 'weather-snowy', // Diamond dust (with or without fog)
  77: 'weather-snowy-heavy', // Snow grains
  78: 'weather-snowy', // Isolated star-like snow crystals (with or without fog)
  79: 'weather-snowy', // Ice pellets
  80: 'weather-rainy', // Rain showers, slight
  81: 'weather-rainy', // Rain showers, moderate or heavy
  82: 'weather-rainy', // Rain showers, violent
  83: 'weather-snowy-rainy', // Shower(s) of rain and snow mixed, slight
  84: 'weather-snowy-rainy', // Shower(s) of rain and snow mixed, moderate or heavy
  85: 'weather-snowy', // Snow showers, slight
  86: 'weather-snowy', // Snow showers, moderate or heavy
  87: 'weather-snowy', // Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, slight
  88: 'weather-snowy', // Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, moderate or heavy
  89: 'weather-snowy', // Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, slight
  90: 'weather-snowy', // Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, moderate or heavy
  91: 'weather-lightning', // Slight rain at time of observation, thunderstorm during the past hour but not at time of observation
  92: 'weather-lightning', // Moderate or heavy rain at time of observation, thunderstorm during the past hour but not at time of observation
  93: 'weather-lightning', // Slight snow, or rain and snow mixed or hail at time of observation, thunderstorm during the past hour but not at time of observation
  94: 'weather-lightning', // Moderate or heavy snow, or rain and snow mixed or hail at time of observation, thunderstorm during the past hour but not at time of observation
  95: 'weather-lightning', // Thunderstorm, slight or moderate, without hail but with rain and/or snow at time of observation
  96: 'weather-lightning-rainy', // Thunderstorm with slight hail
  97: 'weather-lightning', // Thunderstorm, heavy, without hail but with rain and/or snow at time of observation
  98: 'weather-lightning-rainy', // Thunderstorm combined with duststorm or sandstorm at time of observation
  99: 'weather-lightning-rainy', // Thunderstorm with heavy hail
};

export default wmoIcons;
