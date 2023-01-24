export interface groupPort {
  id_: string,
  show_ports: boolean,
  can_add: boolean, 
  can_delete: boolean, 
  can_move: boolean,  
  can_hide: boolean,
  can_set_type: boolean,
  has_code: boolean,
  has_special: boolean,
  has_required: boolean,
  copy_name_from_code: boolean, 
  group_title?: string,
  special_title?: string,
  code_title?: string,
  copy_from_group?: string,
  node_updater_callback_name?: string,
  code_validator_callback_name?: string,
  valid_types: string[],
}

export type groupPorts = {
  input_groups: groupPort[];
  output_groups: groupPort[];
  ui_config_schema: string;
}

export type customNode = {
  [name: string]: groupPorts;
}