import { customNode } from "@/types/groupPorts.types";

export const defaultCustomNodeActor: customNode = {
  Filter: {
    input_groups: [
      {
        // Эта группа доступна для редактирования
        can_add: true, // можно добавлять порты в эту группу (вон плюсик)
        can_delete: true, // можно удалять порты из этой группы (спрятано в менюшке в строчке порта)
        can_hide: false,
        can_move: true, // можно передвигать порты внутри группы (спрятано в менюшке в строчке порта)
        can_set_type: true, // можно менять тип порта (есть кнопка с кратким назвением типа)
        code_title: "",
        code_validator_callback_name: "",
        copy_from_group: "",
        copy_name_from_code: true,
        group_title: "",
        has_code: true,
        has_required: false,
        has_special: false,
        id_: "custom_i", // id группы, уникальное для ноды
        node_updater_callback_name: "",
        show_ports: true,
        special_title: "",
        valid_types: [],
      },
      {
        // эту группу вообще нельзя редактировать (по хорошему все кнопочки можно скрыть или сделать неактивными, на картинке неправильно)
        can_add: false,
        can_delete: false,
        can_hide: false,
        can_move: false,
        can_set_type: false,
        code_title: "",
        code_validator_callback_name: "",
        copy_from_group: "",
        copy_name_from_code: true,
        group_title: "condition", // группа подписана титлом в ноде и конфигураторе (есть на картинке)
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "required_i",
        node_updater_callback_name: "",
        show_ports: true,
        special_title: "",
        valid_types: [],
      },
    ],
    output_groups: [
      {
        can_add: false,
        can_delete: false,
        can_hide: false,
        can_move: false,
        can_set_type: true,
        code_title: "",
        code_validator_callback_name: "",
        copy_from_group: "custom_i",
        copy_name_from_code: true,
        group_title: "",
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "auto_o",
        node_updater_callback_name: "",
        show_ports: false,
        special_title: "",
        valid_types: [],
      },
    ],
    ui_config_schema: "",
  },
  If_Else: {
    input_groups: [
      {
        can_add: true, //можно добавлять порты
        can_delete: true, //можно удалять порты
        can_hide: false,
        can_move: true, //можно передвигать порты в пределах этой группы
        can_set_type: true, //можно задать тип порта
        code_title: "",
        code_validator_callback_name: "",
        copy_from_group: "",
        copy_name_from_code: true,
        group_title: "",
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "custom_i",
        node_updater_callback_name: "",
        show_ports: true,
        special_title: "",
        valid_types: [],
      },
      {
        // нередактируемая группа
        can_add: false,
        can_delete: false,
        can_hide: false,
        can_move: false,
        can_set_type: false,
        code_title: "condition",
        code_validator_callback_name: "",
        copy_from_group: "",
        copy_name_from_code: true,
        group_title: "condition", //подпись к группе чтобы её визуально выделить в интерфейсе
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "required_i",
        node_updater_callback_name: "",
        show_ports: true,
        special_title: "",
        valid_types: [],
      },
    ],
    output_groups: [
      {
        can_add: false,
        can_delete: false,
        can_hide: true,
        can_move: false,
        can_set_type: false,
        code_title: "if condition",
        code_validator_callback_name: "",
        copy_from_group: "custom_i", //копируется из custom_i
        copy_name_from_code: true,
        group_title: "",
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "if_condition",
        node_updater_callback_name: "",
        show_ports: true,
        special_title: "",
        valid_types: [],
      },
      {
        can_add: false,
        can_delete: false,
        can_hide: true,
        can_move: false,
        can_set_type: false,
        code_title: "else",
        code_validator_callback_name: "",
        copy_from_group: "custom_i",
        copy_name_from_code: true,
        group_title: "",
        has_code: false,
        has_required: false,
        has_special: false,
        id_: "else",
        node_updater_callback_name: "",
        show_ports: true,
        special_title: "",
        valid_types: [],
      },
    ],
    ui_config_schema: "",
  },
};

export const defaultCustomNodePipeline: customNode = {
  "Actor": {
    "input_groups": [
      { //пока группы портов редактируемые, но это скорее всего изменится
        "can_add": true,
        "can_delete": true,
        "can_hide": false,
        "can_move": true,
        "can_set_type": false,
        "code_title": "",
        "code_validator_callback_name": "",
        "copy_from_group": "",
        "copy_name_from_code": true,
        "group_title": "",
        "has_code": false,
        "has_required": false,
        "has_special": false,
        "id_": "bus_o",
        "node_updater_callback_name": "",
        "show_ports": true,
        "special_title": "",
        "valid_types": [
          "bus_out" //разрешен единственный тип ноды, совместимый со выходом шины
        ]
      }
    ],
    "output_groups": [
      { //пока группы портов редактируемые, но это скорее всего изменится
        "can_add": true,
        "can_delete": true,
        "can_hide": false,
        "can_move": true,
        "can_set_type": false,
        "code_title": "",
        "code_validator_callback_name": "",
        "copy_from_group": "",
        "copy_name_from_code": true,
        "group_title": "",
        "has_code": false,
        "has_required": false,
        "has_special": false,
        "id_": "bus_i",
        "node_updater_callback_name": "",
        "show_ports": true,
        "special_title": "",
        "valid_types": [
          "bus_in" //разрешен единственный тип ноды, совместимый со входом шины
        ]
      }
    ],
    "ui_config_schema": ""
  },
  "Topic": {
    "input_groups": [
      {// пока можно добавлять и удалять порты
        "can_add": true,
        "can_delete": true,
        "can_hide": false,
        "can_move": true,
        "can_set_type": false,
        "code_title": "",
        "code_validator_callback_name": "",
        "copy_from_group": "",
        "copy_name_from_code": true,
        "group_title": "",
        "has_code": false,
        "has_required": false,
        "has_special": false,
        "id_": "bus_o",
        "node_updater_callback_name": "",
        "show_ports": true,
        "special_title": "",
        "valid_types": [
          "bus_out" //у всех выходных портов будет только один тип
        ]
      }
    ],
    "output_groups": [
      {// пока можно добавлять и удалять порты, но это вопрос вкусовщины
        "can_add": true,
        "can_delete": true,
        "can_hide": false,
        "can_move": true,
        "can_set_type": false,
        "code_title": "",
        "code_validator_callback_name": "",
        "copy_from_group": "",
        "copy_name_from_code": true,
        "group_title": "",
        "has_code": false,
        "has_required": false,
        "has_special": false,
        "id_": "bus_i",
        "node_updater_callback_name": "",
        "show_ports": true,
        "special_title": "",
        "valid_types": [
          "bus_in"//у всех входных портов будет только один тип
        ]
      }
    ],
    "ui_config_schema": ""
  }
};