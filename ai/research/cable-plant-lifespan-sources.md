# Cable plant lifespan: sourced facts

Researched 2026-10-30 for feature 10 in `ai/plans/motion-and-diagrams.md` (one cable plant, several device generations).
How to read the last column. "yes (PDF)": I read the document text myself and the quote is exact. "yes (web)": the page text came back through the fetch tool and matched on repeat fetches; re-open the page before printing a quote word for word. "no": not confirmed from the primary page.

## A. Cabling system warranties (item 1)

| Claim | Exact figure | Source URL | Quote (15 words max) | Verified |
|---|---|---|---|---|
| CommScope system warranty length (SYSTIMAX, UNIPRISE, NETCONNECT) | 25 years from the "Certification Date". Covers product defects and an application warranty. Document BR-111043.1-EN (06/18) | https://webresources.commscope.com/download/assets/Technical+Document%3A+CommScope+Network+Infrastructure+System+25+Year+Extended+Product+Warranty/306b2bf63bd311f09d2d068e18034550 (listed on https://www.commscope.com/Resources/Warranties) | "twenty-five (25) years from the Certification Date" | yes (PDF) |
| CommScope: who may install | Only an "Authorized Partner": certified by CommScope as an installation partner and in good standing on the install date | same PDF | "installed by an Authorized Partner" | yes (PDF) |
| CommScope: testing and registration | Passing test results sent to CommScope within 60 days of install. Registration applied for within 90 days of completion. CommScope issues a numbered certificate | same PDF | "tested pursuant to industry standards and applicable CommScope testing requirements" | yes (PDF) |
| CommScope: what is covered | Passive products only, bought from an Authorized Reseller, as one end-to-end system | same PDF | "Passive products manufactured by CommScope" | yes (PDF) |
| CommScope business was sold | Amphenol closed its purchase of CommScope's cable and connectivity (CCS) business in Jan 2026 (article dated 2026-01-12) | https://cablinginstall.com/cable/press-release/55342663/amphenol-completes-acquisition-of-commscopes-cable-and-connectivity-solutions-business | "now called CommScope, an Amphenol company" | yes (web) |
| CommScope warranty issuer and terms after the sale | The article does not name SYSTIMAX or NETCONNECT. The PDF above is the 2018 text and still sits on commscope.com. Whether terms changed: not checked | none | none | no |
| Panduit Certification Plus System Warranty length | 15, 20 or 25 years. The page does not say what decides the term | https://www.panduit.com/en/legal-information/certification-plus-system-warranty.html | "15, 20 or 25-year standards-based, performance warranty" | yes (web) |
| Panduit: who may install | Panduit ONE(SM) Partner with the "Deploy" accreditation, with an RCDD or Panduit-approved equivalent on staff | same page | "only available when installed by a Panduit ONESM Partner accredited with the Deploy competency" | yes (web) |
| Panduit: registration | Certificate is issued after Panduit registers and validates the system | same page | "installed, registered, and validated by Panduit" | yes (web) |
| Panduit: exclusion | Bad installation work is not covered | same page | "does not cover issues related to improper installation" | yes (web) |

## B. Expected service life of cabling (item 2)

| Claim | Exact figure | Source URL | Quote (15 words max) | Verified |
|---|---|---|---|---|
| ISO/IEC 11801, second edition (2002), Introduction | Generic cabling anticipated to have a usable life of more than 10 years | https://elstandard.se/documents/preview/950101 | "anticipated to have a usable life in excess of 10 years" | yes (PDF) |
| That 2002 edition is no longer in force | Replaced by ISO/IEC 11801-1:2017 and 11801-2:2017. Withdrawal date 2017-11-13 | https://webstore.iec.ch/en/publication/9682 | "This publication has been replaced by:" | yes (web) |
| Current ISO/IEC 11801-1:2017 repeats the 10-year line | Not found in its Introduction or Scope. I only had the free preview (pages 1-20), not the full text | https://assets.vde-verlag.de/iec-normen/preview-pdf/info_isoiec11801-1%7Bed1.0%7Den.pdf | none | no |
| BICSI design guide: backbone cabling | Plan for a life cycle of at least 10 years past commissioning. ANSI/BICSI 005-2016, section 5.4.1.2.2 (security systems best practices). A minimum, not a limit | https://aux.bicsi.org/om/BICSI-005-2016.pdf | "for a life cycle of at least ten years past the commissioning date" | yes (PDF) |
| CommScope design horizon, office retrofit | At least 10 years of installed life (blog first published 2016, page dated 2017) | https://www.commscope.com/Blog/Cabling-Your-Office-Space-for-Efficiency-and-High-Performance/ | "Office retrofit projects are intended to serve at least 10 years of installed life" | yes (web) |
| CommScope design horizon, new construction | At least 15 to 20 years (same blog) | same | "greenfield construction at least 15-20 years" | yes (web) |
| TIA-568 says cabling has a useful life over ten years | Appears in a Canadian (CSA) listing of the 2001-era TIA-568-B.1. Seen only as a search excerpt. The page returned HTTP 403, so I could not check it or the current TIA-568 text | https://scc-ccn.ca/standardsdb/standards/4025807 | "intended to have a useful life in excess of ten years" | no |
| Siemon "10 years, 2 or 3 generations of active electronics" | Seen in one search excerpt. No live Siemon page found | none | none | no |

## C. Device support windows (item 3)

| Claim | Exact figure | Source URL | Quote (15 words max) | Verified |
|---|---|---|---|---|
| Cisco hardware support | 5 years of TAC support and 5 years of replacement parts from the end-of-sale (EOS) date, for customers with active support contracts. Products already under an EOL notice when the policy began are excluded. Meraki has its own policy | https://www.cisco.com/c/en/us/products/eos-eol-policy.html | "Five (5) years of TAC support for hardware from the EOS date." | yes (web) |
| Cisco example: Cisco and Meraki Wi-Fi 6 indoor access points | Announced 2026-03-30. Last day to order 2026-12-31. Last Date of Support 2031-12-31 (5 years) | https://www.cisco.com/c/en/us/products/collateral/wireless/catalyst-9100ax-access-points/meraki-wi-fi-6-indoor-access-points-eol.pdf | "The last day to order the affected product(s) is December 31, 2026." | yes (PDF) |
| Meraki support | Typically 5 years after end of sale | https://www.cisco.com/site/us/en/about/corporate-strategy-office/acquisitions/meraki/policies.html | "a period of five (5) years after the EOS date" | yes (web) |
| Aruba (HPE) switches | End of support is "generally" 5 years after end of sale. 3810 example: end of sale 2023-06-30, end of support 2028-06-30 | https://asp-documents.arubanetworks.com/portals/0/el/EOS_Notice_3810-Switches.pdf | "generally 5 years from End of Sale Date, but subject to change" | yes (PDF) |
| Aruba (HPE) access points | AP-114 and AP-115 (802.11n): end of sale 2016-05-01, end of support 2021-05-01 | https://asp-documents.arubanetworks.com/portals/0/el/EOS_Notice_110_Series.pdf | "End of support for the products is May 1, 2021." | yes (PDF) |
| Axis cameras, hardware | Hardware and RMA (repair or swap) service for 6 years after discontinuation. Example P1245, P1265, P1275: discontinued 2024-06-02, service to 2030-06-02 | https://www.axis.com/dam/public/9f/a1/28/discontinuation-statement-axis-p1245-p1265_-p1275-en-06-24-en-US-442584.pdf | "hardware and RMA service for 6 years after the discontinuation date" | yes (PDF) |
| Axis cameras, firmware | AXIS OS support for at least 5 years after discontinuation. Same example: fixes end 2029-06-02 | https://www.axis.com/support/warranty/general-support-policy-after-discontinuation-date | "at least five years after its discontinuation date" | yes (web) |
| Axis warranty | 5 years from shipment | https://www.axis.com/support/warranty | "under normal use for 5 years from the date of shipment" | yes (web) |
| Ubiquiti | Help center sorts products into "Vintage" and "Legacy". I found no stated number of years. Page returned HTTP 403 | https://help.ui.com/hc/en-us/articles/1500001268521-Ubiquiti-s-Vintage-and-Legacy-Products | none | no |
| A typical customer refresh cycle (for example 3 to 5 years) | No manufacturer publishes one. Only blogs state it | none | none | no |

## D. Wi-Fi generations (item 4)

| Claim | Exact figure | Source URL | Quote (15 words max) | Verified |
|---|---|---|---|---|
| IEEE approval dates | 802.11n 2009-09-11. 802.11ac 2013-12-09. 802.11ax 2021-02-01. 802.11be 2024-09-26 (published 2025-07-22) | https://www.ieee802.org/11/Reports/802.11_Timelines.htm | "IEEE Std P802.11be-2024" | yes (web) |
| Wi-Fi 8 is not out | IEEE 802.11bn approval predicted May 2028 | same | "IEEE Std P802.11bn" | yes (web) |
| Wi-Fi names (2018-10-03) | Wi-Fi 4 = 802.11n, Wi-Fi 5 = 802.11ac, Wi-Fi 6 = 802.11ax | https://www.wi-fi.org/news-events/newsroom/wi-fi-alliance-introduces-wi-fi-6 | "Wi-Fi 5 to identify devices that support 802.11ac technology" | yes (web) |
| Wi-Fi 5 certification launch | 2013-06-19 | https://www.wi-fi.org/news-events/newsroom/wi-fi-certified-ac-takes-wi-fi-performance-to-new-heights | "Wi-Fi Alliance launched its Wi-Fi CERTIFIED ac certification program" | yes (web) |
| Wi-Fi 6 certification launch | 2019-09-16 | https://www.wi-fi.org/news-events/newsroom/wi-fi-certified-6-delivers-new-wi-fi-era | "certification program from Wi-Fi Alliance is now available" | yes (web) |
| Wi-Fi 6E certification launch | 2021-01-07. 6E is Wi-Fi 6 extended into the 6 GHz band | https://www.wi-fi.org/news-events/newsroom/wi-fi-alliance-delivers-wi-fi-6e-certification-program | "Wi-Fi Alliance certification for Wi-Fi 6E is now available" | yes (web) |
| Wi-Fi 7 certification launch | 2024-01-08 | https://wi-fi.org/news-events/newsroom/wi-fi-alliance-introduces-wi-fi-certified-7 | "Wi-Fi CERTIFIED 7 is here, introducing powerful new features that boost Wi-Fi performance" | yes (web) |
| Alliance's own "introduced" years | Wi-Fi 4 2009, Wi-Fi 5 2014, Wi-Fi 6 2018, Wi-Fi 7 2024. No year given for Wi-Fi 8 | https://www.wi-fi.org/discover-wi-fi/wi-fi-6 | "Wi-Fi 5 was introduced in 2014" | yes (web) |

## Read before using

- A warranty term is not a lifespan. Write "warranty up to 25 years", never "cable lasts 25 years".
- The only "10 years or more" lines I verified are BICSI 005-2016 (a design minimum) and the 2002 ISO/IEC 11801 text (no longer in force). Do not write "the standard says 10 years" as if it were current.
- Makers publish how long they support a product after they stop selling it (5 to 6 years). They do not publish how long a customer keeps a device. Do not print a device lifespan or a "replaced every 3 to 5 years" figure.
- Pick one basis for Wi-Fi dates and label it. Alliance certification launches (2013, 2019, 2021, 2024) are cleanest. The Alliance's "introduced" years and IEEE approval years differ for Wi-Fi 5 and Wi-Fi 6.
- Since late 2011 the Alliance opened certification for four Wi-Fi releases: 5, 6, 6E and 7. 6E is Wi-Fi 6 in a new band, not a new number. Wi-Fi 4 was already current in 2011. Do not draw Wi-Fi 8.
- Nothing here shows that old cable carries new Wi-Fi speeds. Do not imply it.
- Nothing here shows Armak holds a CommScope or Panduit certification or offers a manufacturer warranty. All warranty facts are about the manufacturers.

## Safe to say on the site

1. Major cabling manufacturers offer system warranties of up to 25 years on structured cabling. (Brand version: CommScope 25 years, Panduit 15, 20 or 25 years, only if the owner approves naming them.)
2. Those warranties apply only when an installer the manufacturer has certified does the work and the system is registered with the manufacturer.
3. A BICSI design guide says backbone cabling should be designed to allow for growth for at least ten years after it is put into service.
4. Since 2013 the Wi-Fi Alliance has opened certification for Wi-Fi 5 (2013), Wi-Fi 6 (2019), Wi-Fi 6E (2021) and Wi-Fi 7 (2024).
5. Cisco, Aruba and Meraki each say they support a product for about five years after they stop selling it, and Axis says six years of hardware service for discontinued cameras.

Sentences 1 and 2 say nothing about Armak. Keep them away from Armak's own claims unless the owner says yes to the first question below.

## Questions for the owner

Short yes or no answers are enough.

- [ ] Is Armak a certified installer or partner today in any cabling maker's warranty program (for example CommScope or Panduit)? Yes / No. If yes: which one, and is it current? (CommScope's cable business was sold to Amphenol in January 2026.)
- [ ] Does Armak give its own written warranty on cabling work? Yes / No. If yes: how many years?
- [ ] May the chart name CommScope and Panduit? Yes / No. If no, it says "major cabling manufacturers".
- [ ] Does Armak install the devices too (access points, switches, cameras), not only the cabling? Yes / No.
- [ ] Is any cabling Armak installed still in service after 20 or more years? Yes / No. If yes, it can be shown as Armak's own proof.
