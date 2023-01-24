import { customNode } from "@/types/groupPorts.types";

export const defaultCustomNode: customNode = {
  Filter: {
    input_groups: [
      { // Эта группа доступна для редактирования
        can_add: true, // можно добавлять порты в эту группу (вон плюсик)
        can_delete: true, // можно удалять порты из этой группы (спрятано в менюшке в строчке порта)
        can_hide: false, 
        can_move: true, // можно передвигать порты внутри группы (спрятано в менюшке в строчке порта)
        can_set_type: true, // можно менять тип порта (есть кнопка с кратким назвением типа)
        code_title: '',
        code_validator_callback_name: '',
        copy_from_group: '',
        copy_name_from_code: true,
        group_title: '',
        has_code: true,
        has_required: false,
        has_special: false,
        id_: "custom_i", // id группы, уникальное для ноды
        node_updater_callback_name: '',
        show_ports: true,
        special_title: '',
        valid_types: []
      },
      { // эту группу вообще нельзя редактировать (по хорошему все кнопочки можно скрыть или сделать неактивными, на картинке неправильно)
        can_add: false,
        can_delete: false,
        can_hide: false,
        can_move: false,
        can_set_type: false, 
        code_title: '',
        code_validator_callback_name: '',
        copy_from_group: '',
        copy_name_from_code: true,
        group_title: "condition", // группа подписана титлом в ноде и конфигураторе (есть на картинке)
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "required_i",
        node_updater_callback_name: '',
        show_ports: true,
        special_title: '',
        valid_types: []
      }
    ],
    output_groups: [
      {
        can_add: false,
        can_delete: false,
        can_hide: false,
        can_move: false,
        can_set_type: true,
        code_title: '',
        code_validator_callback_name: '',
        copy_from_group: "custom_i",
        copy_name_from_code: true,
        group_title: '',
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "auto_o",
        node_updater_callback_name: '',
        show_ports: false,
        special_title: '',
        valid_types: []
      }
    ],
    ui_config_schema: "",
  },
}