class Flat < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  # code for manage secodn direction in geocoder
  # def destiny_address(destiny)
  #   Geocoder.search(destiny)
  # end
end
