# Specification

## Summary
**Goal:** Replace the Pickup Location and Drop Location city dropdowns in both the HeroSection booking form and the BookingModal (Step 1) with Google Maps Places Autocomplete text inputs.

**Planned changes:**
- Replace the Pickup Location city dropdown in the HeroSection booking form with a Google Maps Places Autocomplete text input that shows live suggestions as the user types.
- Replace the Drop Location city dropdown in the HeroSection booking form with a Google Maps Places Autocomplete text input.
- Replace the Pickup Location and Drop Location city dropdowns in BookingModal Step 1 with Google Maps Places Autocomplete text inputs.
- Load the Google Maps Places API script in the HTML with a clearly labeled `YOUR_GOOGLE_MAPS_API_KEY` placeholder.
- Style the autocomplete suggestion dropdowns to match the existing navy/gold booking form theme.
- Ensure selected place names/addresses are retained in the booking summary step of the modal, and that validation still requires non-empty values before proceeding to Step 2.

**User-visible outcome:** Users can now type any place, address, or landmark into the Pickup and Drop Location fields in both the hero booking form and the booking modal, and receive live Google Maps-powered suggestions to select from.
