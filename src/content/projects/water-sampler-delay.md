---
title: Automated Water Samplers for Intermittent Streams
tagline: Four automated peristaltic water samplers modified with time-delay relays, so they wait for an arroyo's first debris-laden flow to clear before sampling.
group: field
order: 2
status: study
context: Rider Resources, contract field technician, 2023
role: Sampler modification
credit: "Contract work with Rider Resources, Durango, Colorado. Shown with permission."
skills: [fieldwork]
stack: [Automated peristaltic water samplers, GEYA GRT8-A1 time-delay relays, 12 V DC wiring, DIN rail]
cover: ../../assets/projects/water-sampler-delay/sampler-modified.jpg
coverAlt: "Inside an automated water sampler: the green controller board at top left, the pump motor below it, and a white time-delay relay on a DIN rail wired between them"
coverCaption: "A modified sampler: the time-delay relay (right) sits between the controller board and the pump motor."
figureSets:
  - title: "Before and after"
    intro: "The stock controller switches the pump directly. The modification adds a relay that holds the pump until the delay runs out."
    figures:
      - title: "Stock sampler"
        caption: "The controller board drives the pump motor directly."
        src: ../../assets/projects/water-sampler-delay/sampler-stock.jpg
        alt: "A green sampler controller board in its enclosure, wired straight to a gear motor"
      - title: "Four relays, ready to install"
        caption: "One adjustable time-delay relay per sampler, mounted on DIN rail and pre-wired."
        src: ../../assets/projects/water-sampler-delay/relays.jpg
        alt: "Four white DIN-rail time-delay relays with red and black leads laid out on a wooden table"
---

Four automated peristaltic samplers were set in intermittent streams and arroyos at a mine reclamation site in northwest New Mexico. These channels are dry most of the time, so a water sensor in the streambed triggers each sampler when flow arrives. The first flow carries debris, though, and the stock timer couldn't delay the pump long enough for the stream to clear, so samples captured the debris rather than the water.

## The modification

I added an adjustable time-delay relay to each sampler, wired between the controller and the pump motor. When the sensor detects water, the relay holds the pump for a set time, 2 minutes here, before letting it run. That gives the stream time to clear and makes the samples more representative.

<figure class="video">
  <video src="/media/sampler-relay-delay.mp4" poster="/media/sampler-relay-delay.jpg" controls muted playsinline preload="metadata" width="720" height="480"></video>
  <figcaption>The relay's green light flashes while it counts the delay, then goes steady as the pump switches on.</figcaption>
</figure>

Also from my contract work with Rider Resources: [a climate station after the Gold King Mine spill](/projects/silverton-climate-station/).
