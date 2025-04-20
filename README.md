# rangeMap
JavaScript function to open observations/compare tab in iNaturalist with queries for each child of a taxon

iNaturalist already has a feature like this (Show taxon children). But this function improves on it by allowing extra parameters. These need to be specified as the second argument, as a string, beginning with &, e.g. "&introduced=false&without_taxon_id=7251". If no extra parameters are used, no second argument is required.

Another improvement is the abbreviation of multiword names. If you are looking at the range map for a genus, it's redundant to include the genus name in every species, and quite frankly, it's bad for accessibility given that you can only see around 11 characters in a query name without scrolling. So if you run rangeMap(54297), "Citrus × limon" becomes just "× limon" and "Citrus trifoliata" becomes just "trifoliata".

For some reason, even though this function specifies the Categorical colour scheme, colours aren't assigned to queries until you do something, like edit the query name, query or select a colour scheme again.
