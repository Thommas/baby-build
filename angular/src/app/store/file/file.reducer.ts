/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { FileActionTypes, FileActionsUnion } from './file.actions';

const initialState = {
  fileInput: {
    input: null,
  },
};

export function fileReducer(state: any = initialState, action: FileActionsUnion): any {
  switch (action.type) {
    case FileActionTypes.SetFile:
      return {
        ...state,
        fileInput: {
          input: action.payload.input !== undefined ? action.payload.input : state.fileInput.input,
        },
      };

    default:
      return state;
  }
}
