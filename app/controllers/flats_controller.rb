class FlatsController < ApplicationController
  before_action :set_flat, only: %i[show edit update destroy]

  # GET /flats or /flats.json
  def index
    @flats = Flat.all
    @markers = @flats.geocoded.map do |flat|
      {
        lat: flat.latitude,
        lng: flat.longitude,
        # for manage secodn direction in geocoder
        # end_lat: @flat.end_latitude,
        # end_lng: @flat.end_logitude,
        info_window: render_to_string(partial: 'info_window', locals: { flat: flat }),
        marker_html: render_to_string(partial: "marker")
      }
    end
  end

  # GET /flats/1 or /flats/1.json
  def show
    # una forma de hacerlo pero no es la mejor
    # @markers = @flat.geocode.map do |flat|
    #   {
    #     lat: @flat.latitude,
    #     lng: @flat.longitude,
    #     info_window: render_to_string(partial: "info_window", locals: { flat: @flat }),
    #     marker_html: render_to_string(partial: "marker")
    #   }
    # end

    @markers = [{ lat: @flat.geocode[0],
                  lng: @flat.geocode[1],
                  info_window: render_to_string(partial: "info_window", locals: { flat: @flat }),
                  marker_html: render_to_string(partial: "marker") }]
    # metodo geocode lo que hace es obtener en un array las coordenadas de un record, lat primero y lng despues
  end

  # GET /flats/new
  def new
    @flat = Flat.new
  end

  # GET /flats/1/edit
  def edit
  end

  # POST /flats or /flats.json
  def create
    @flat = Flat.new(flat_params)

    # For manage second direction
    # @destiny_coordenates = @flat.destiny_address(params[:flat][:end_address])
    # @flat.end_latitude = @destiny_coordenates.first.coordinates.first
    # @flat.end_logitude = @destiny_coordenates.first.coordinates.last

    respond_to do |format|
      if @flat.save
        format.html { redirect_to flat_url(@flat), notice: "Flat was successfully created." }
        format.json { render :show, status: :created, location: @flat }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @flat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /flats/1 or /flats/1.json
  def update
    respond_to do |format|
      if @flat.update(flat_params)
        format.html { redirect_to flat_url(@flat), notice: "Flat was successfully updated." }
        format.json { render :show, status: :ok, location: @flat }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @flat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /flats/1 or /flats/1.json
  def destroy
    @flat.destroy

    respond_to do |format|
      format.html { redirect_to flats_url, notice: "Flat was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_flat
      @flat = Flat.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def flat_params
      params.require(:flat).permit(:name, :address)
    end
end
