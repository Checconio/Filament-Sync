const fs = require('fs')
const os = require('os')
const {USERID} = require("../user-config");

const getOSInfo = () => {
    return {
        'osType': os.type(),
        'homeDir': os.userInfo().homedir
    }
}

const convertSlicerFormat = (preset) => {
    let presetNotes = preset.filament_notes[0]
    for (value in preset) {
        if(Array.isArray(preset[value])) {
            preset[value] = preset[value][0]

            if(Array.isArray(preset[value])) {
                preset[value] = preset[value][0]
            }
        }
        else {
            preset[value] = preset[value]
        }
    }
    preset.filament_notes = JSON.parse(presetNotes)
    return preset
}

const getInherits = (name) => {
    const {osType, homeDir} = getOSInfo()
    const crealityProfileFile = homeDir + '/AppData/Roaming/Creality/Creality Print/6.0/system/Creality/filament/' + name + '.json'

    let parsedProfile = JSON.parse(fs.readFileSync(crealityProfileFile))

    for (value in parsedProfile) {
        if(Array.isArray(parsedProfile[value])) {
            parsedProfile[value] = parsedProfile[value][0]
        }
        else {
            parsedProfile[value] = parsedProfile[value]
        }
    }

    return parsedProfile;
}

const convertToPrinterFormat = (preset) => {
    let newPreset
    let presetNotes
    let inherits

    newPreset = convertSlicerFormat(preset)
    presetNotes = newPreset.filament_notes
    inherits = getInherits(newPreset.inherits)

    let newObject = {
        "engineVersion": newPreset.version,
        "printerIntName": "F0008",
        "nozzleDiameter": ["0.4"],
        "kvParam": {
            "activate_air_filtration": newPreset.activate_air_filtration || inherits.activate_air_filtration,
            "activate_chamber_temp_control": newPreset.activate_chamber_temp_control || inherits.activate_chamber_temp_control,
            "additional_cooling_fan_speed": newPreset.additional_cooling_fan_speed || inherits.additional_cooling_fan_speed,
            "chamber_temperature": newPreset.chamber_temperature || inherits.chamber_temperature,
            "close_fan_the_first_x_layers": newPreset.close_fan_the_first_x_layers || inherits.close_fan_the_first_x_layers,
            "compatible_printers": "",
            "compatible_printers_condition": "",
            "compatible_prints": "",
            "compatible_prints_condition": "",
            "complete_print_exhaust_fan_speed": newPreset.complete_print_exhaust_fan_speed || inherits.complete_print_exhaust_fan_speed,
            "cool_cds_fan_start_at_height": newPreset.cool_cds_fan_start_at_height || inherits.cool_cds_fan_start_at_height,
            "cool_plate_temp": newPreset.cool_plate_temp || inherits.cool_plate_temp,
            "cool_plate_temp_initial_layer": newPreset.cool_plate_temp_initial_layer || inherits.cool_plate_temp_initial_layer,
            "cool_special_cds_fan_speed": newPreset.cool_special_cds_fan_speed || inherits.cool_special_cds_fan_speed,
            "default_filament_colour": "\"\"",
            "during_print_exhaust_fan_speed": newPreset.during_print_exhaust_fan_speed || inherits.during_print_exhaust_fan_speed,
            "enable_overhang_bridge_fan": newPreset.enable_overhang_bridge_fan || inherits.enable_overhang_bridge_fan,
            "enable_pressure_advance": newPreset.enable_pressure_advance || inherits.enable_pressure_advance,
            "enable_special_area_additional_cooling_fan": newPreset.enable_special_area_additional_cooling_fan || inherits.enable_special_area_additional_cooling_fan,
            "eng_plate_temp": newPreset.eng_plate_temp || inherits.eng_plate_temp,
            "eng_plate_temp_initial_layer": newPreset.eng_plate_temp_initial_layer || inherits.eng_plate_temp_initial_layer,
            "epoxy_resin_plate_temp": newPreset.epoxy_resin_plate_temp || inherits.epoxy_resin_plate_temp,
            "epoxy_resin_plate_temp_initial_layer": newPreset.epoxy_resin_plate_temp_initial_layer || inherits.epoxy_resin_plate_temp_initial_layer,
            "fan_cooling_layer_time": newPreset.fan_cooling_layer_time || inherits.fan_cooling_layer_time,
            "fan_max_speed": newPreset.fan_max_speed || inherits.fan_max_speed,
            "fan_min_speed": newPreset.fan_min_speed || inherits.fan_min_speed,
            "filament_cooling_final_speed": newPreset.filament_cooling_final_speed || inherits.filament_cooling_final_speed,
            "filament_cooling_initial_speed": newPreset.filament_cooling_initial_speed || inherits.filament_cooling_initial_speed,
            "filament_cooling_moves": newPreset.filament_cooling_moves || inherits.filament_cooling_moves,
            "filament_cost": newPreset.filament_cost || inherits.filament_cost,
            "filament_density": newPreset.filament_density || inherits.filament_density,
            "filament_deretraction_speed": newPreset.filament_deretraction_speed || inherits.filament_deretraction_speed,
            "filament_diameter": newPreset.filament_diameter || inherits.filament_diameter,
            "filament_end_gcode": newPreset.filament_end_gcode || inherits.filament_end_gcode,
            "filament_flow_ratio": newPreset.filament_flow_ratio || inherits.filament_flow_ratio,
            "filament_is_support": newPreset.filament_is_support || inherits.filament_is_support,
            "filament_load_time": newPreset.filament_load_time || inherits.filament_load_time,
            "filament_loading_speed": newPreset.filament_loading_speed || inherits.filament_loading_speed,
            "filament_loading_speed_start": newPreset.filament_loading_speed_start || inherits.filament_loading_speed_start,
            "filament_max_volumetric_speed": newPreset.filament_max_volumetric_speed || inherits.filament_max_volumetric_speed,
            "filament_minimal_purge_on_wipe_tower": newPreset.filament_minimal_purge_on_wipe_tower || inherits.filament_minimal_purge_on_wipe_tower,
            "filament_multitool_ramming": newPreset.filament_multitool_ramming || inherits.filament_multitool_ramming,
            "filament_multitool_ramming_flow": newPreset.filament_multitool_ramming_flow || inherits.filament_multitool_ramming_flow,
            "filament_multitool_ramming_volume": newPreset.filament_multitool_ramming_volume || inherits.filament_multitool_ramming_volume,
            "filament_notes": newPreset.filament_notes || inherits.filament_notes,
            "filament_ramming_parameters": newPreset.filament_ramming_parameters || inherits.filament_ramming_parameters,
            "filament_retract_before_wipe": newPreset.filament_retract_before_wipe || inherits.filament_retract_before_wipe,
            "filament_retract_lift_above": newPreset.filament_retract_lift_above || inherits.filament_retract_lift_above,
            "filament_retract_lift_below": newPreset.filament_retract_lift_below || inherits.filament_retract_lift_below,
            "filament_retract_lift_enforce": newPreset.filament_retract_lift_enforce || inherits.filament_retract_lift_enforce,
            "filament_retract_restart_extra": newPreset.filament_retract_restart_extra || inherits.filament_retract_restart_extra,
            "filament_retract_when_changing_layer": newPreset.filament_retract_when_changing_layer || inherits.filament_retract_when_changing_layer,
            "filament_retraction_length": newPreset.filament_retraction_length || inherits.filament_retraction_length,
            "filament_retraction_minimum_travel": newPreset.filament_retraction_minimum_travel || inherits.filament_retraction_minimum_travel,
            "filament_retraction_speed": newPreset.filament_retraction_speed || inherits.filament_retraction_speed,
            "filament_shrink": newPreset.filament_shrink || inherits.filament_shrink,
            "filament_soluble": newPreset.filament_soluble || inherits.filament_soluble,
            "filament_start_gcode": newPreset.filament_start_gcode || inherits.filament_start_gcode,
            "filament_toolchange_delay": newPreset.filament_toolchange_delay || inherits.filament_toolchange_delay,
            "filament_type": newPreset.filament_type || inherits.filament_type,
            "filament_unload_time": newPreset.filament_unload_time || inherits.filament_unload_time,
            "filament_unloading_speed": newPreset.filament_unloading_speed || inherits.filament_unloading_speed,
            "filament_unloading_speed_start": newPreset.filament_unloading_speed_start || inherits.filament_unloading_speed_start,
            "filament_vendor": newPreset.filament_vendor || inherits.filament_vendor,
            "filament_wipe": newPreset.filament_wipe || inherits.filament_wipe,
            "filament_wipe_distance": newPreset.filament_wipe_distance || inherits.filament_wipe_distance,
            "filament_z_hop": newPreset.filament_z_hop || inherits.filament_z_hop,
            "filament_z_hop_types": newPreset.filament_z_hop_types || inherits.filament_z_hop_types,
            "full_fan_speed_layer": newPreset.full_fan_speed_layer || inherits.full_fan_speed_layer,
            "hot_plate_temp": newPreset.hot_plate_temp || inherits.hot_plate_temp,
            "hot_plate_temp_initial_layer": newPreset.hot_plate_temp_initial_layer || inherits.hot_plate_temp_initial_layer,
            "inherits": newPreset.inherits || inherits.inherits,
            "material_flow_dependent_temperature": newPreset.material_flow_dependent_temperature || inherits.material_flow_dependent_temperature,
            "material_flow_temp_graph": "",
            "nozzle_temperature": newPreset.nozzle_temperature || inherits.nozzle_temperature,
            "nozzle_temperature_initial_layer": newPreset.nozzle_temperature_initial_layer || inherits.nozzle_temperature_initial_layer,
            "nozzle_temperature_range_high": newPreset.nozzle_temperature_range_high || inherits.nozzle_temperature_range_high,
            "nozzle_temperature_range_low": newPreset.nozzle_temperature_range_low || inherits.nozzle_temperature_range_low,
            "overhang_fan_speed": newPreset.overhang_fan_speed || inherits.overhang_fan_speed,
            "overhang_fan_threshold": newPreset.overhang_fan_threshold || inherits.overhang_fan_threshold,
            "pressure_advance": newPreset.pressure_advance || inherits.pressure_advance,
            "reduce_fan_stop_start_freq": newPreset.reduce_fan_stop_start_freq || inherits.reduce_fan_stop_start_freq,
            "required_nozzle_HRC": newPreset.required_nozzle_HRC || inherits.required_nozzle_HRC,
            "slow_down_for_layer_cooling": newPreset.slow_down_for_layer_cooling || inherits.slow_down_for_layer_cooling,
            "slow_down_layer_time": newPreset.slow_down_layer_time || inherits.slow_down_layer_time,
            "slow_down_min_speed": newPreset.slow_down_min_speed || inherits.slow_down_min_speed,
            "support_material_interface_fan_speed": newPreset.support_material_interface_fan_speed || inherits.support_material_interface_fan_speed,
            "temperature_vitrification": newPreset.temperature_vitrification || inherits.temperature_vitrification,
            "textured_plate_temp": newPreset.textured_plate_temp || inherits.textured_plate_temp,
            "textured_plate_temp_initial_layer": newPreset.textured_plate_temp_initial_layer || inherits.textured_plate_temp_initial_layer
        },
        "base": {
            "id": presetNotes.id,
            "brand": newPreset.filament_vendor,
            "name": newPreset.name,
            "meterialType": newPreset.filament_type || inherits.filament_type,
            "colors": [
                "#ffffff"
            ],
            "density": Number(newPreset.filament_density || inherits.filament_density),
            "diameter": newPreset.filament_diameter || inherits.filament_diameter,
            "costPerMeter": 0,
            "weightPerMeter": 0,
            "rank": 280,
            "minTemp": Number(newPreset.nozzle_temperature_range_low || inherits.nozzle_temperature_range_low),
            "maxTemp": Number(newPreset.nozzle_temperature_range_high || inherits.nozzle_temperature_range_high),
            "isSoluble": newPreset.filament_soluble == 1 || inherits.filament_soluble == 1 ? true : false,
            "isSupport": newPreset.filament_is_support == 1 || inherits.filament_is_support == 1 ? true : false,
            "shrinkageRate": 0,
            "softeningTemp": 0,
            "dryingTemp": 0,
            "dryingTime": 0
        }
    }

    return newObject
}

module.exports = convertToPrinterFormat