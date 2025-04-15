
import ModuleModel from "./model.js";

export function findModulesForCourse(courseId) {
  return ModuleModel.find({ course: courseId });
}

export function createModule(module) {
    return ModuleModel.create(module);
  }

  export function deleteModule(moduleId) {
    return ModuleModel.deleteOne({ _id: moduleId });
   }

   export function updateModule(moduleId, moduleUpdates) {
    return ModuleModel.updateOne({ _id: moduleId } , {$set: moduleUpdates});
  }
  
   
  
