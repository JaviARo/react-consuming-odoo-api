# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class Bicycles(http.Controller):

    @http.route('/api/bicycles/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        bicycles_rec = request.env['bicycles.bicycles'].sudo().search([])
        bicycles = []
        for rec in bicycles_rec:
            vals = {
                'id': rec.id,
                'brand': rec.brand,
                'model': rec.model
            }
            bicycles.append(vals)
        return {'status': 200, 'response': bicycles, 'message': 'Success'}

    @http.route('/api/bicycles/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['bicycles.bicycles']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
            'id': rec.id,
            'brand': rec.brand,
            'model': rec.model
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/bicycles/findByBrand', type="json", auth="public", csrf=True, cors='*')
    def findByBrand(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['brand'] + '%'
        bicycles_rec = request.env['bicycles.bicycles'].sudo().search([('brand', '=ilike', reg_exp)])
        bicycles = []
        for rec in bicycles_rec:
            vals = {
                'id': rec.id,
                'brand': rec.brand,
                'model': rec.model
            }
            bicycles.append(vals)
        return {'status': 200, 'response': bicycles, 'message': 'Success'}

    @http.route('/api/bicycles/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["bicycles.bicycles"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/bicycles/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["bicycles.bicycles"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/bicycles/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["bicycles.bicycles"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/bicycles/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["bicycles.bicycles"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_bicycles = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_bicycles.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data
