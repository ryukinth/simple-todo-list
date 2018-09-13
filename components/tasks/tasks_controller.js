const Tasks = require('./tasks_model');
const utility = require('../utility/common');


exports.getAllTasks = async function(req, res) {
    let tasks;
    try {
        tasks = await Tasks.find({is_deleted: false}).lean().exec();
        if (tasks.length == 0)
            return utility.responseJson(null, req, res, 200, {result: true, message: 'No Data.', data: tasks});
    } catch (error) {
        return utility.responseJson(error, req, res, 500);
    }

    return utility.responseJson(null, req, res, 200, {result: true, message: 'Success.', data: tasks});
};

exports.getTask = async function(req, res) {
    const id = req.params.id;

    let task;
    try {
        task = await Tasks.findOne({_id: id, is_deleted: false}).lean().exec();
        if (!task)
            return utility.responseJson(null, req, res, 200, {result: true, message: 'No Data.', data: {}});
    } catch (error) {
        return utility.responseJson(error, req, res, 500);
    }
    
    return utility.responseJson(null, req, res, 200, {result: true, message: 'Success.', data: task});
};

exports.createTask = async function(req, res) {
    const subject = req.body.subject;
    const detail = req.body.detail;

    try {
        await utility.validateUndefined(subject, 'subject');
        await utility.validateUndefined(detail, 'detail');
        await utility.validateDataType(subject, 'string', 'subject');
        await utility.validateDataType(detail, 'string', 'detail');
    } catch (error) {
        return utility.responseJson(error, req, res, 400);
    }

    let savedTask;
    try {
        savedTask = await new Tasks({subject: subject, detail: detail}).save();
    } catch (error) {
        return utility.responseJson(error, req, res, 500);
    }
    
    return utility.responseJson(null, req, res, 200, {result: true, message: 'Success.', data: savedTask});
};

exports.editTask = async function(req, res) {
    const id = req.params.id;
    const subject = req.body.subject;
    const detail = req.body.detail;
    const isDone = req.body.is_done;

    if (req.body.created_date !== undefined) delete  req.body.created_date;
    if (req.body.modified_date !== undefined) delete  req.body.modified_date;
    if (req.body.is_deleted !== undefined) delete  req.body.is_deleted;

    req.body.modified_date = Date.now();

    try {
        if (subject !== undefined) await utility.validateDataType(subject, 'string', 'subject');
        if (detail !== undefined) await utility.validateDataType(detail, 'string', 'detail');
        if (isDone !== undefined) await utility.validateDataType(isDone, 'boolean', 'is_done');
    } catch (error) {
        return utility.responseJson(error, req, res, 400);
    }

    let task;
    try {
        task = await Tasks.findOneAndUpdate({_id: id},{$set: req.body}, {new: true}).lean().exec();
    } catch (error) {
        return utility.responseJson(error, req, res, 500);
    }
    
    return utility.responseJson(null, req, res, 200, {result: true, message: 'Success.', data: task});
};

exports.deleteTask = async function(req, res) {
    const id = req.params.id;

    let task;
    try {
        task = await Tasks.findOneAndUpdate({_id: id}, {$set: {is_deleted: true, modified_date: Date.now(), deleted_date: Date.now()}}, {new: true}).lean().exec();
    } catch (error) {
        return utility.responseJson(error, req, res, 500);
    }
    
    return utility.responseJson(null, req, res, 200, {result: true, message: 'Success.', data: task});
};
